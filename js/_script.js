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

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ' '){

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

      /*titleList.insertAdjacentHTML('beforeend', linkHTML);
        console.log(titleList);*/
        html = html + linkHTML;
        console.log('html', html);
    }

  titleList.innerHTML = html;

}

  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');
  console.log('links', links);

  for(let link of links){
      link.addEventListener('click', titleClickHandler);
 }

function generateTags(){
  /* find all articles */

  const articles =  document.querySelectorAll(optArticleSelector);
  console.log('articles', articles);

  /* START LOOP: for every article: */

  for(let article of articles){

    /* find tags wrapper */

    const taglist = article.querySelector(optArticleTagsSelector);
    console.log('taglist', taglist);
    //taglist.innerHTML = '';

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags:', articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray', articleTagsArray);

    /* START LOOP: for each tag */

      for(let tag of  articleTagsArray){
      console.log('tag:', tag);

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log('linkHTML', linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;
      //tagList.innerHTML = html;
      //console.log('html', html);

    /* END LOOP: for each tag */

  }

    /* insert HTML of all the links into the tags wrapper */

  taglist.innerHTML = html;

  /* END LOOP: for every article: */
 }
}

generateTags();

function tagClickHandler(event){
  console.log('Link was clicked!');

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log('this', this);

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log('href', href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  console.log('tag', tag);

  /* find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeTags', activeTags);

  /* START LOOP: for each active tag link */

  for(activeTag of activeTags){

    /* remove class active */

    activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */

}

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = activeTags.querySelectorAll('a[href="' + href + '"]');
  console.log('tagLinks', tagLinks);

  /* START LOOP: for each found tag link */

  for(tagLink of tagLinks){

    /* add class active */

    tagLink.classList('remove');
    console.log('tagLink', tagLink);

  /* END LOOP: for each found tag link */

}

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */



  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();