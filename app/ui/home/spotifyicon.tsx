import {siSpotify} from 'simple-icons';
import React from 'react';

const SpotifyIcon: React.FC = () => {
  return (
    <div>
      <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={`#${siSpotify.hex}`}
        dangerouslySetInnerHTML={{ __html: siSpotify.path }} // Injects the SVG path directly
      />
    </div>
  );
};

export default SpotifyIcon;