import {ICameraTransform, IRect} from 'core/layouts/scene/scene';

// Dizayn koordinatlarındakı düzbucaqlını viewport-a yerləşdirən transform.
// contain → hamısı görünür, cover → viewport-u tam doldurur (ekrana zoom üçün).
export const getCameraTransform = (
    rect: IRect,
    viewport: {width: number; height: number},
    mode: 'contain' | 'cover',
): ICameraTransform => {
    const scaleX = viewport.width / rect.w;
    const scaleY = viewport.height / rect.h;
    const scale = mode === 'contain' ? Math.min(scaleX, scaleY) : Math.max(scaleX, scaleY);

    return {
        scale,
        x: (viewport.width - rect.w * scale) / 2 - rect.x * scale,
        y: (viewport.height - rect.h * scale) / 2 - rect.y * scale,
    };
};

export const delay = (seconds: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));
};
