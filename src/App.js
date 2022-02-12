import React, {useEffect, useState} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards'
import useStyles from './styles.js'
import image from './speak.png'
import wordsToNumbers from 'words-to-numbers'


const alanKey = '8d7cf3008c29e79fa510682e1b52a1e92e956eca572e1d8b807a3e2338fdd0dc/stage'


const App = () => {
  const classes = useStyles()


  const [newsArticles, setNewsArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(-1)
  
    useEffect(() => {
      alanBtn({
        key: alanKey,
        onCommand: ( {command, articles, number} ) => {
            if (command === 'newHeadlines') {
              setNewsArticles(articles)
              setActiveArticle(-1)
            } else if (command === 'highlight') {
               setActiveArticle((prevActiveArticle) => prevActiveArticle + 1 )
            } else if (command === 'open') {
              const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number
              const article = articles[ parsedNumber - 1 ]

              if (parsedNumber > 20) {
                alanBtn().playText('please try that again...')
              } else if (article) { 
              window.open(articles[number].url, '_blank')
              alanBtn().playText('opening...')

            } else {
              alanBtn().playText('Please try that again...');
            }
          } 
        }
      })
    }, [])

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src={image}
             alt='Alan AI News Reader Application'
             className={classes.alanlogo}
             style={{ borderRadius: 10, marginBottom: 20 }} 
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>

      <div className={classes.back}> say 'BACK' to return</div>
    </div>
  )
}

export default App
