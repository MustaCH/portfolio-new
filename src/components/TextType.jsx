'use client';

import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';

/**
 * @typedef {Object} TextTypeProps
 * @property {string | string[] | undefined} [text]
 * @property {boolean} [stripHtml]
 * @property {keyof HTMLElementTagNameMap | React.ComponentType<any>} [as]
 * @property {number} [typingSpeed]
 * @property {number} [initialDelay]
 * @property {number} [pauseDuration]
 * @property {number} [deletingSpeed]
 * @property {boolean} [loop]
 * @property {string} [className]
 * @property {boolean} [showCursor]
 * @property {boolean} [hideCursorWhileTyping]
 * @property {string} [cursorCharacter]
 * @property {string} [cursorClassName]
 * @property {number} [cursorBlinkDuration]
 * @property {string[]} [textColors]
 * @property {{ min: number; max: number } | undefined} [variableSpeed]
 * @property {(sentence: string, index: number) => void} [onSentenceComplete]
 * @property {boolean} [startOnVisible]
 * @property {boolean} [reverseMode]
 */

/**
 * @param {TextTypeProps} props
 */
const TextType = ({
  text,
  stripHtml = true,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete = undefined,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const stripHtmlTags = useCallback(
    (raw) => {
      if (!stripHtml) return raw ?? '';
      const div = typeof document !== 'undefined' ? document.createElement('div') : null;
      if (div) {
        div.innerHTML = raw ?? '';
        return div.textContent || div.innerText || '';
      }
      return String(raw ?? '').replace(/<[^>]*>/g, '');
    },
    [stripHtml]
  );

  const resolvedText = useMemo(() => {
    const base = text;
    const value = Array.isArray(base) ? base : [base ?? ''];
    return value.map(v => stripHtmlTags(v));
  }, [text, stripHtmlTags]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return '#ffffff';
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  // Reset animation when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentCharIndex(0);
    setIsDeleting(false);
    setCurrentTextIndex(0);
  }, [text]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout;

    const currentText = resolvedText[currentTextIndex];
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          if (currentTextIndex === resolvedText.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(resolvedText[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex(prev => (prev + 1) % resolvedText.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(prev => prev + processedText[currentCharIndex]);
              setCurrentCharIndex(prev => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else if (resolvedText.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    resolvedText,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < resolvedText[currentTextIndex].length || isDeleting);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props
    },
    <span className="inline" style={{ color: getCurrentTextColor() }}>
      {displayedText}
    </span>,
    showCursor && (
      <span
        ref={cursorRef}
        className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;
