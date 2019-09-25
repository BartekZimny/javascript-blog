'use strict';

function titleClickHandler(event){
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */

  const clickedElement = this;
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

    console.log('articleSelector and getAttribute:', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle', targetArticle);

  /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
    console.log('targetArticle', targetArticle);

    event.preventDefault();
}

/*const links = document.querySelectorAll('.titles a');
console.log('links', links);
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}*/

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  console.log('titleList', titleList);
  titleList.innerHTML = '';

  /* for each article */

  const articles =  document.querySelectorAll('.post');
  console.log('articles', articles);

  let html = '';

    for(let article of articles){

    /* get the article id */

        const articleId = article.getAttribute('id');
        console.log('articleId', articleId);

    /* find the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log('articleTitle', articleId);

    /* create HTML of the link */

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log('linkHTML', linkHTML);

    /* insert link into titleList */

      /* titleList.insertAdjacentHTML('beforeend', linkHTML);
        console.log(titleList);*/
        html = html + linkHTML;
        console.log('html', html);
    }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log('links', links);

  for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();