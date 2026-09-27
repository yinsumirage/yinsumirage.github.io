// Table of contents for blog posts, built from the post's h2/h3 headings.
// The same list is rendered twice: in the left column on desktop (replacing the
// author profile) and as a collapsible box above the post on narrow screens;
// CSS decides which one shows. The layout only emits the containers when the
// post has at least three h2/h3 sections.
(function () {
  var article = document.querySelector('.post');
  var content = document.querySelector('.post-content');
  var navs = document.querySelectorAll('[data-toc]');
  if (!article || !content || !navs.length) return;

  var headings = Array.prototype.filter.call(content.querySelectorAll('h2, h3'), function (h) {
    return h.id;
  });
  if (headings.length < 3) return;

  // Clearance under the fixed masthead, which is taller on phones (two rows).
  var masthead = document.querySelector('.masthead');
  function offset() {
    return (masthead ? masthead.offsetHeight : 70) + 14;
  }
  var linksById = {};

  function labelOf(heading) {
    return heading.textContent.replace(/\\[()[\]]/g, '').replace(/\s+/g, ' ').trim();
  }

  function jumpTo(event) {
    var heading = document.getElementById(this.getAttribute('data-target'));
    if (!heading) return;
    // Handle the jump here: the theme's jQuery smooth-scroll cannot resolve
    // percent-encoded (e.g. Chinese) ids.
    event.preventDefault();
    event.stopImmediatePropagation();
    window.scrollTo({ top: heading.getBoundingClientRect().top + window.pageYOffset - offset(), behavior: 'smooth' });
    history.replaceState(null, '', '#' + heading.id);
  }

  function buildList() {
    var list = document.createElement('ol');
    list.className = 'post-toc-list';
    var lastTop = null;
    var sub = null;
    headings.forEach(function (heading) {
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.setAttribute('href', '#' + heading.id);
      link.setAttribute('data-target', heading.id);
      link.textContent = labelOf(heading);
      link.addEventListener('click', jumpTo);
      item.appendChild(link);
      (linksById[heading.id] = linksById[heading.id] || []).push(link);

      if (heading.tagName === 'H3' && lastTop) {
        if (!sub) {
          sub = document.createElement('ol');
          lastTop.appendChild(sub);
        }
        sub.appendChild(item);
      } else {
        list.appendChild(item);
        lastTop = item;
        sub = null;
      }
    });
    return list;
  }

  Array.prototype.forEach.call(navs, function (nav) {
    nav.appendChild(buildList());
    var box = nav.closest('[hidden]');
    if (box) box.hidden = false;
  });

  // Highlight the section being read.
  var activeId = null;
  var side = document.querySelector('.post-toc-rail');

  function keepVisible(link) {
    if (!side || !side.contains(link) || side.scrollHeight <= side.clientHeight) return;
    // The rail runs under the fixed masthead; its top padding is not visible.
    var hidden = parseFloat(window.getComputedStyle(side).paddingTop) || 0;
    var top = link.offsetTop;
    var bottom = top + link.offsetHeight;
    if (top < side.scrollTop + hidden + 8) side.scrollTop = top - hidden - 8;
    else if (bottom > side.scrollTop + side.clientHeight - 8) side.scrollTop = bottom - side.clientHeight + 8;
  }

  function update() {
    ticking = false;
    var current = null;
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].getBoundingClientRect().top - offset() - 16 > 0) break;
      current = headings[i].id;
    }
    // The last sections may be too short to ever reach the top of the window.
    var last = headings[headings.length - 1];
    var atBottom = window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 2;
    if (atBottom && last.getBoundingClientRect().top < window.innerHeight) current = last.id;
    if (current === activeId) return;
    if (activeId) linksById[activeId].forEach(function (a) { a.classList.remove('is-active'); });
    activeId = current;
    if (activeId) {
      linksById[activeId].forEach(function (a) {
        a.classList.add('is-active');
        keepVisible(a);
      });
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.setTimeout(update, 60);
    }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
