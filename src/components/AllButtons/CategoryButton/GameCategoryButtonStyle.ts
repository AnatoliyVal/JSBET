import React from 'react';

// Варіант 1: Вбудовані стилі (Inline Styles)
// Зверни увагу: тут неможливо написати :hover або @media через CSS.
// Ці стилі просто додадуться безпосередньо в атрибут style="..."

export const buttonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 18px",
  borderRadius: "50px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  fontSize: "13px",
  fontWeight: "500",
  color: "#a0a0a0",
  cursor: "pointer",
  transition: "all 0.2s ease",
  whiteSpace: "nowrap"
};

export const imageStyle: React.CSSProperties = {
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  objectFit: "cover",
  flexShrink: 0
};
