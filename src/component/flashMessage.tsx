import * as React from 'react';
import styled, { keyframes, css } from 'styled-components';

export type FlashLevel = 'INFO' | 'DEBUG' | 'ERROR';

export interface FlashState {
    message: string;
    level: FlashLevel;
    visible: boolean;
}

// ── Animations ──────────────────────────────────────────────────────────────
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(12px); }
`;

// ── Color map ────────────────────────────────────────────────────────────────
const COLORS: Record<FlashLevel, { bg: string; border: string; color: string }> = {
    INFO: { bg: '#e8f4fd', border: '#42A5F5', color: '#1565c0' },
    DEBUG: { bg: '#f3e5f5', border: '#ab47bc', color: '#6a1b9a' },
    ERROR: { bg: '#fdecea', border: '#ef5350', color: '#b71c1c' },
};

// ── Styled wrapper ───────────────────────────────────────────────────────────
const Wrapper = styled.div<{ level: FlashLevel; leaving: boolean }>`
  position: fixed;
  bottom: 1.2rem;
  right: 1.2rem;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 220px;
  max-width: 380px;
  padding: 0.6rem 1rem;
  border-left: 4px solid ${({ level }) => COLORS[level].border};
  border-radius: 6px;
  background: ${({ level }) => COLORS[level].bg};
  color: ${({ level }) => COLORS[level].color};
  font-size: 0.82rem;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  ${({ leaving }) =>
        leaving
            ? css`animation: ${fadeOut} 0.35s ease forwards;`
            : css`animation: ${fadeIn} 0.25s ease forwards;`}
`;

const Badge = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  opacity: 0.7;
`;

// ── Component ────────────────────────────────────────────────────────────────
interface Props {
    flash: FlashState;
}

export const FlashMessage: React.FC<Props> = ({ flash }) => {
    const [leaving, setLeaving] = React.useState(false);

    // Reset leaving state when a new message arrives
    React.useEffect(() => {
        setLeaving(false);
    }, [flash.message, flash.level]);

    if (!flash.visible && !leaving) return null;

    return (
        <Wrapper level={flash.level} leaving={leaving}>
            <Badge>[{flash.level}]</Badge>
            {flash.message}
        </Wrapper>
    );
};
