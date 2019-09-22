{
  const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log('Event: ', event);

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('Add active to clickedElement:', clickedElement);
  
  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('clicked href:', articleSelector);
 
  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log('value of href:', targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
  console.log('active article:', targetArticle);

  }
  const links = document.querySelectorAll('.titles a');
    for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }





  







  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

  function generateTitleLinks(){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector).innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll('.titles');

  for(let article of articles){
    article.classList.remove('active');
  }



  let html = '';

  for(let article of articles){



  /* get the article id */

  const articleId = element.getAttribute('id')


  /* find the title element */

  const articleTitle = article.querySelector(optTitleSelector).innerHTML;


  /* get the title from the title element */




  /* create HTML of the link */

  const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
  console.log('html link:', linkHTML);

  /* insert link into titleList */
  html = html + linkHTML;

  }
  titleList.innerHTML = html;
}

generateTitleLinks();

























}