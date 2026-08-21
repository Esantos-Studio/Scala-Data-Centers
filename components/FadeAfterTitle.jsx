'use client';

// Sub-text that waits for its section heading's SplitText reveal to finish
// (see SplitHeading's onComplete) instead of firing on its own scroll-into-
// view — so it never appears before the title. `visible` is owned by the
// parent section component.
export default function FadeAfterTitle({ as: Tag = 'p', className = '', visible, children, ...rest }) {
  return (
    <Tag className={`fade-after-title${visible ? ' is-visible' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
