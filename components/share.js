import {
    FacebookShareButton,
    FacebookIcon,
    RedditShareButton,
    RedditIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
  } from 'next-share';

import styles from '../styles/Share.module.css';

const shareUrl = 'https://nozama.dev';
const title = 'Nozama: a look back at your Amazon shopping';

export default function Share() {
    return (
        <div className={styles.main}>  
           <FacebookShareButton
                url={shareUrl}
                title={title}
            >
                <FacebookIcon size={32} />
            </FacebookShareButton>
            <RedditShareButton
                url={shareUrl}
                title={title}
                >
                <RedditIcon size={32} />
            </RedditShareButton>
            <TwitterShareButton
                url={shareUrl}
                title={title}
                >
                <TwitterIcon size={32} />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={32} />
            </LinkedinShareButton>
        </div>
    );
}