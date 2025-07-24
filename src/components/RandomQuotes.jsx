import { useState } from 'react'
import styles from './RandomQuotes.module.css'
import { FaTwitter, FaTumblr } from 'react-icons/fa'

const quotes = [
  {
    quote: "The best way to find yourself is to lose yourself in the service of others.",
    author: "Mahatma Gandhi",
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote: "The biggest risk is not taking any risk.",
    author: "Mark Zuckerberg",
  },
  {
    quote: "Be the change that you wish to see in the world.",
    author: "Mahatma Gandhi",
  },
  {
    quote: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    quote: "The best revenge is massive success.",
    author: "Frank Sinatra",
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
]

export default function RandomQuotes() {

  const [quote, setQuote] = useState(quotes[0])

  const randomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[randomIndex])
  }

  return (
    <div className={styles.quoteBox} id="quote-box">
      <p id="text" className={styles.text}>{quote.quote}</p>
      <p id="author" className={styles.author}>- {quote.author}</p>
      <div id="buttons" className={styles.buttons}>
        <span className={styles.socialMedia}>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(quote.quote + ' -' + quote.author)}`} className={styles.tweetQuote} id="tweet-quote" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,inspiration&caption=${encodeURIComponent(quote.author)}&content=${encodeURIComponent(quote.quote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`} className={styles.tumblrQuote} id="tumblr-quote" target="_blank" rel="noopener noreferrer">
            <FaTumblr />
          </a>
        </span>
        <button id="new-quote" onClick={randomQuote} className={styles.newQuote}>New Quote</button>
      </div>
    </div>
  )
}