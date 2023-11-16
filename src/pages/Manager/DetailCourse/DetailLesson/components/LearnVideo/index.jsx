import ReactPlayer from 'react-player';

function LearnVideo({ url, key }) {
  return <ReactPlayer key={key} width={780} height={420} url={url} />;
}

export default LearnVideo;
