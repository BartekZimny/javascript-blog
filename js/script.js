{
  const titleClickHandler = function (event) {
    const clickedElement = this;
    console.log('Link was clicked!');

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('Add active to clickedElement:', clickedElement);

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');
    for (let activeArticle of activeArticles) {
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
    event.preventDefault();
  }

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleTagSelector = '.post-tags a',
    optTagsListSelector = '.list.tags a',
    optArticleAuthorSelector = '.post-author',
    optArticleAuthorSelectorLink = '.post-author a',
    optCloudClassCount = 5,
    optAuthorsListSelector = '.list.authors a';

  function generateTitleLinks(customSelector = ' ') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log('titleList', titleList);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('articles', articles);

    let html = '';

    for (let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id')
      console.log('articleId', articleId);

      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('articleTitle', articleId);

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('html link:', linkHTML);

      /* insert link into titleList */
      html = html + linkHTML;
      console.log('html', html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();

  // [VERY NEW] create a new variable object params with max and min value
  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 999999
    }
    // [VERY NEW] START LOOP for every tags
    for (let tag in tags) {

      //console.log(tag + ' is used ' + tags[tag] + ' times ');
      /* first option - standard if*/
      // [VERY NEW] set value for params.max as tags[tag] only if the value is higher than current
      if (tags[tag] > params.max) {
        params.max = tags[tag];
        //console.log('params.max:', params.max);
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
        //console.log('params.min:', params.min);
      }
      //params.max = tags[tag];
      /* second option - short if */
      //params.max = tags[tag] > params.max ? tags[tag] : params.max;
      /* third option - math.max */
      //params.max = Math.max(tags[tag], params.max);
    }
    return params;
  }

  function calculateTagClass(count, params) {
    //console.log('calculateTagClass:', calculateTagClass, 'count:' ,count, 'params:', params);
    const normalizedCount = count - params.min;
    //console.log('normalizedCount:', normalizedCount);
    const normalizedMax = params.max - params.min;
    //console.log('normalizedMax:', normalizedMax);
    const percentage = normalizedCount / normalizedMax;
    //console.log('percentage:', percentage);
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    //console.log('classNumber:', classNumber);
    return classNumber;
  }

  function generateTags() {

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles', articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const taglist = article.querySelector(optArticleTagsSelector);
      console.log('taglist', taglist);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags:', articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('articleTagsArray:', articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log('tag:', tag);

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>' + ' ';
        console.log('linkHTML:', linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML;
        console.log('html:', html);

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags.hasOwnProperty(tag)) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      taglist.innerHTML = html;

      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] add html from allTags to tagList */
    //tagList.innerHTML = allTags.join(' ');
    //console.log(allTags);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {

      /* [NEW] generate code of link and add it to allTagHTML */
      const tagLinkHTML = '<li><a class>"' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
      allTagsHTML += '<li><a class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag + '</span></a>' + ' (' + allTags[tag] + ') </li>';

      //allTagsHTML += tagLinkHTML;
      console.log('allTagsHTML:', allTagsHTML);
    }

    /* [NEW] END LOOP: for each tag in allTags: */
    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }
  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('this', this);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('clickedElement:', clickedElement);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag:', tag);

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('activeTags:', activeTags);

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {

      /* remove class active */
      activeTag.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href^="#tag-' + tag + '"]');
    console.log('tagLinks:', tagLinks);

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {

      /* add class active */
      tagLink.classList.add('active');
      console.log('tagLink:', tagLink);

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const tagLinks = document.querySelectorAll(optArticleTagSelector + ',' + optTagsListSelector);
    console.log('tagLinks:', tagLinks)

    /* START LOOP: for each link */
    for (let tag of tagLinks) {

      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  function calculateAuthorsParams(authors) {
    const params = {
      max: 0,
      min: 999999
    }
    // [VERY NEW] START LOOP for every tags
    for (let author in authors) {
      //console.log(author + ' is used ' + authors[author] + ' times ');

      /* first option - standard if*/
      // [VERY NEW] set value for params.max as authors[author] only if the value is higher than current
      if (authors[author] > params.max) {
        params.max = authors[author];
        //console.log('params.max:', params.max);
      }
      if (authors[author] < params.min) {
        params.min = authors[author];
        //console.log('params.min:', params.min);
      }
    }
    return params;
  }

  function calculateAuthorClass(count, params) {
    //console.log('calculateAuthorClass:', calculateAuthorClass, 'count:' ,count, 'params:', params);
    const normalizedCount = count - params.min;
    //console.log('normalizedCount:', normalizedCount);
    const normalizedMax = params.max - params.min;
    //console.log('normalizedMax:', normalizedMax);
    const percentage = normalizedCount / normalizedMax;
    //console.log('percentage:', percentage);
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    //console.log('classNumber:', classNumber);
    return classNumber;
  }

  function generateAuthors() {
    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* find all article authors */
    const authorArticles = document.querySelectorAll(optArticleSelector);
    //console.log('authorArticles:', authorArticles);

    /* START LOOP: for every author: */
    for (let authorArticle of authorArticles) {
      //console.log('authorArticle',authorArticle);
      //console.log('authorArticles', authorArticles);

      /* find author wrapper */
      const authorList = authorArticle.querySelector(optArticleAuthorSelector);
      //console.log('authorList:', authorList);
      /* make html variable with empty string */
      let html = '';
      //console.log(html);

      /* get authors from data-author attribute */
      const articleAuthor = authorArticle.getAttribute('data-authors');
      //console.log('articleAuthor:', articleAuthor);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>' + ' ';
      //console.log('linkHTML:', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      //console.log(html);
      //eslint-disable-next-line
      if (!allAuthors.hasOwnProperty(articleAuthor)) {

        /* [NEW] add generated code to allAuthors array */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      /* insert HTML of all the links into the author wrapper */
      authorList.innerHTML = html;

      /* END LOOP: for every author: */
    }
    /* [NEW] find list of authors in right column */
    const authorCloudList = document.querySelector('.authors');
    const authorParams = calculateAuthorsParams(allAuthors);
    //console.log('authorParams:', authorParams);

    /*[NEW] add html from allTags to taglist */
    let allAuthorsHTML = ' ';
    console.log('allAuthorsHTML:', allAuthorsHTML);

    /* [NEW] START LOOP: for each author in allAuthors: */
    for (let articleAuthor in allAuthors) {

      /*[NEW] generate code of a link and add it to allTagsHTML */
      const authorLinkHTML = '<li><a class ="tag-size-' + calculateAuthorClass(allAuthors[articleAuthor], authorParams) + '" href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>' + ' ';
      console.log('authorLinkHTML:', authorLinkHTML);
      allAuthorsHTML += authorLinkHTML;

      /* [NEW] END LOOP: for each author in allAuthors: */
    }
    /* [NEW] add html from allAuthors to authorList */
    authorCloudList.innerHTML = allAuthorsHTML;
    console.log('allAuthorsHTML:', allAuthorsHTML);
  }
  generateAuthors();

  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log('this:', this);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log('clickedElement', href);

    /* make a new constant "author" and extract authors from the "href" constant */
    const author = href.replace('#author-', '');
    //console.log('author:', author);

    /* find all author links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    //console.log('activeAuthors:', activeAuthors);

    /* START LOOP: for each active author link */
    for (let activeAuthor of activeAuthors) {
      //console.log('activeAuthor:', activeAuthor);

      /* remove class active */
      activeAuthor.classList.remove('active');
      //console.log('activeAuthor:', activeAuthor);
      
      /* END LOOP: for each active author link */
    }
    /* find all auithor links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');
    //console.log('authorLinks:', authorLinks);

    /* START LOOP: for each found author link */
    for (let authorLink of authorLinks) {

      /* add class active */
      authorLink.classList.add('active');

      /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with author selector as argument */
    generateTitleLinks('[data-authors="' + author + '"]');
    //console.log(generateTitleLinks);
  }

  function addClickListenersToAuthors() {
    /* find all links to authors */
    const linksToAuthors = document.querySelectorAll(optArticleAuthorSelectorLink + ' , ' + optAuthorsListSelector);
    console.log('authorLinks:', linksToAuthors);

    /* START LOOP: for each link */
    for (let author of linksToAuthors) {

      /* add authorClickHandler as event listener for that link */
      author.addEventListener('click', authorClickHandler);
      console.log('author:', author);

      /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthors();

}