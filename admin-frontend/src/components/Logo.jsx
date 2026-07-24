import React from 'react';

export default function Logo({ className }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" stroke="currentColor" strokeWidth="8" strokeLinejoin="round"/>
      <path d="M50 25L75 40V65L50 80L25 65V40L50 25Z" fill="currentColor"/>
      <circle cx="50" cy="52.5" r="8" fill="white" opacity="0.9"/>
    </svg>
  );
}
