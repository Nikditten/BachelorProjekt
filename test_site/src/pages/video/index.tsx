import { FC } from 'react';

const VideoPage: FC = () => {
  return (
    <div>
      <video
        src='https://www.w3schools.com/html/mov_bbb.mp4'
        width='320'
        height='240'
        controls
      />
    </div>
  );
};

export default VideoPage;
