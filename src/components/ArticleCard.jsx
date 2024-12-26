import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NewsCard = ({ article }) => {
  return (
    <Card>
      <Link to={`/articles/${article.id}`}>
        <CardMedia
          sx={{ height: 220 }}
          image={article.image ? `https://mustafocoder.pythonanywhere.com/api${article.image}` : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"}
          title={article.title}
        />
      </Link>
      <CardContent>
        <p className='mb-2 opacity-50 text-sm'>{article.author}</p>
        <Link to={`/articles/${article.id}`}>
          <Typography className='line-clamp-2 ' gutterBottom variant="h5" component="div">
            {article.title}
          </Typography>
        </Link>
        <Typography className='line-clamp-4' variant="body2" sx={{ color: 'text.secondary' }}>
          {article.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={`/articles/${article.id}`} size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default NewsCard