import ArticleCard from './ArticleCard'

const News = ({ articles }) => {
  return (
    <div className='mt-5 pb-10'>
      <div className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 container px-5'>
        {articles.map(a => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  )
}

export default News