/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$projects = $('#projects'),
		$wrapper = $('#wrapper'),
		$dropdown = $('.dropdown'),
		$menu_items = $dropdown.find('.dropdown-nav-links a'),
		$dropdown_pic = $('.dropdown-profile-pic'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article'),
		// $projects_cycle = $('#projects-sel'),
		// $selected_project = $projects_cycle.children('div'), 
		$activeProjBtn = $('.active-proj')
		$leftBtn = $('.projects-switcher button:first-child')
		$rightBtn = $('.projects-switcher button:last-child')
		$left_arrow = $('#left-arrow-btn'),
		$right_arrow = $('#right-arrow-btn');


	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

		$(document).keydown(function( event ) {
		
		if ($projects.css('display') === "none") return 
			
		if (+event.which === 37){
			$left_arrow.click();
		}
		
		if (+event.which === 39){
			$right_arrow.click();
		}
	})
			



			
		

		$left_arrow.on('click', function(event){
			
			$leftBtn.click();
			
			// $active = $selected_project.filter('.default-project')
			
			// $new = $active.prev()[0].className !== "projects-switcher" ? $active.prev() : $selected_project.last()
			// debugger
			// $active.removeClass('default-project').addClass('projects-main-content')
			// $new.removeClass('projects-main-content').addClass('default-project')
			

		})

		$right_arrow.on('click', function(event){
			$rightBtn.click();	
			// $active = $selected_project.filter('.default-project')
			// $new = !!$active.next().length ? $active.next() : $selected_project.first()
			// $active.removeClass('default-project').addClass('projects-main-content')
			// $new.removeClass('projects-main-content').addClass('default-project')
			
		})

		$menu_items.on('click',function(event){
			debugger
			$menu_items.removeClass('selected-dropdown');
			
			$selected = $menu_items.filter(event.target)
			
			
			$selected.addClass('selected-dropdown');
			
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Fix: Flexbox min-height bug on IE.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

	// Nav.
		var $nav = $header.children('nav'),
			$nav_li = $nav.find('li');

		// Add "middle" alignment classes if we're dealing with an even number of items.
			if ($nav_li.length % 2 == 0) {

				$nav.addClass('use-middle');
				$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

			}

	// Main.
		var	delay = 325,
			locked = false;

		// Methods.
			$main._show = function(id, initial) {

				var $article = $main_articles.filter('#' + id);

				// No such article? Bail.
					if ($article.length == 0)
						return;

				// Handle lock.

					// Already locked? Speed through "show" steps w/o delays.
						if (locked || (typeof initial != 'undefined' && initial === true)) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Mark as visible.
								$body.addClass('is-article-visible');

							// Deactivate all articles (just in case one's already active).
								$main_articles.removeClass('active');

							// Hide header, footer.
								$header.hide();
								$footer.hide();

							// Show main, article.
								$main.show();
								$article.show();
								$dropdown_pic.show();

							// Activate article.
								$article.addClass('active');

							// Unlock.
								locked = false;

							// Unmark as switching.
								setTimeout(function() {
									$body.removeClass('is-switching');
								}, (initial ? 1000 : 0));

							return;

						}

					// Lock.
						locked = true;

				// Article already visible? Just swap articles.
					if ($body.hasClass('is-article-visible')) {

						// Deactivate current article.
							var $currentArticle = $main_articles.filter('.active');

							$currentArticle.removeClass('active');

						// Show article.
							setTimeout(function() {

								// Hide current article.
									$currentArticle.hide();

								// Show article.
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

				// Otherwise, handle as normal.
					else {

						// Mark as visible.
							$body
								.addClass('is-article-visible');

						// Show article.
							setTimeout(function() {

								// Hide header, footer.
									$header.hide();
									$footer.hide();

								// Show main, article.
									$main.show();
									$article.show();
									$dropdown_pic.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

			};

			$main._hide = function(addState) {

				var $article = $main_articles.filter('.active');

				// Article not visible? Bail.
					if (!$body.hasClass('is-article-visible'))
						return;

				// Add state?
					if (typeof addState != 'undefined'
					&&	addState === true)
						history.pushState(null, null, '#');

				// Handle lock.

					// Already locked? Speed through "hide" steps w/o delays.
						if (locked) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Deactivate article.
								$article.removeClass('active');

							// Hide article, main.
								$article.hide();
								$main.hide();
								$dropdown_pic.hide();

							// Show footer, header.
								$footer.show();
								$header.show();

							// Unmark as visible.
								$body.removeClass('is-article-visible');

							// Unlock.
								locked = false;

							// Unmark as switching.
								$body.removeClass('is-switching');

								// Remove selected button
							

							// Window stuff.
								$window
									.scrollTop(0)
									.triggerHandler('resize.flexbox-fix');

							return;

						}

					// Lock.
						locked = true;

				// Deactivate article.
					$article.removeClass('active');

				// Hide article.
					setTimeout(function() {

						// Hide article, main.
							$article.hide();
							$main.hide();
							$dropdown_pic.hide();
						// Show footer, header.
							$footer.show();
							$header.show();

						// Unmark as visible.
							setTimeout(function() {

								$body.removeClass('is-article-visible');

								// Window stuff.
									$window
										.scrollTop(0)
										.triggerHandler('resize.flexbox-fix');

								// Unlock.
									setTimeout(function() {
										locked = false;
									}, delay);

							}, 25);

					}, delay);


			};

		// Articles.
			$main_articles.each(function() {

				var $this = $(this);

				// Close.
					$('<div class="close">Close</div>')
						.appendTo($this)
						.on('click', function() {
							location.hash = '';
							$menu_items.removeClass('selected-dropdown');
						});

				// Prevent clicks from inside article from bubbling.
					$this.on('click', function(event) {
						event.stopPropagation();
					});

			});

		// Events.
			$body.on('click', function(event) {
				
				///
				if (event.target === $dropdown || $.contains($dropdown[0], event.target)){
					return
				}
				
				$menu_items.removeClass('selected-dropdown');
				///
				
				// Article visible? Hide.
					if ($body.hasClass('is-article-visible'))
						$main._hide(true);

			});

			$window.on('keyup', function(event) {

				switch (event.keyCode) {

					case 27:

						// Article visible? Hide.
							if ($body.hasClass('is-article-visible'))
							
								$main._hide(true);

						break;

					default:
						break;

				}

			});

			$window.on('hashchange', function(event) {

				// Empty hash?
					if (location.hash == ''
					||	location.hash == '#') {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Hide.
							$main._hide();

					}

				// Otherwise, check for a matching article.
					else if ($main_articles.filter(location.hash).length > 0) {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Show article.
							$main._show(location.hash.substr(1));

					}

			});

		// Scroll restoration.
		// This prevents the page from scrolling back to the top on a hashchange.
			if ('scrollRestoration' in history)
				history.scrollRestoration = 'manual';
			else {

				var	oldScrollPos = 0,
					scrollPos = 0,
					$htmlbody = $('html,body');

				$window
					.on('scroll', function() {

						oldScrollPos = scrollPos;
						scrollPos = $htmlbody.scrollTop();

					})
					.on('hashchange', function() {
						$window.scrollTop(oldScrollPos);
					});

			}

		// Initialize.

			// Hide main, articles.
				$main.hide();
				$main_articles.hide();
				$dropdown_pic.hide();

			// Initial article.
				if (location.hash != ''
				&&	location.hash != '#')
					$window.on('load', function() {
						$main._show(location.hash.substr(1), true);
					});

})(jQuery);

function goToContact() {
	const dropdown = document.getElementsByClassName('dropdown')
	
	about = dropdown[0].querySelector("a")
	contact = dropdown[0].querySelector("li:last-of-type a")
	
	
	about.classList.remove('selected-dropdown')
	contact.classList.add('selected-dropdown')
}

function chooseProject(selected){
	
	const chosenBtn = selected
	const prevProjBtn = document.querySelector(".active-proj")
	const oldValue= prevProjBtn.value;
	const oldSrc = prevProjBtn.firstChild.src;
	const projectsMain = document.getElementById('projects-sel');
	const projectsDivs = projectsMain.getElementsByClassName('projects-main-content')
	const currentProj = projectsMain.querySelector('.default-project')
	if (prevProjBtn === chosenBtn) return
	
	switch (chosenBtn.value) {
		case "cyms":
			
			currentProj.classList.remove('default-project')
			currentProj.classList.add('projects-main-content')
			
			projectsDivs[2].classList.add('default-project')
			projectsDivs[2].classList.remove('projects-main-content')
			break;

		case "mlb":
			currentProj.classList.remove('default-project')
			currentProj.classList.add('projects-main-content')
			
			
			projectsDivs[0].classList.add('default-project')
			projectsDivs[0].classList.remove('projects-main-content')
		break;

		case "videoTube":
			currentProj.classList.remove('default-project')
			currentProj.classList.add('projects-main-content')
			
			
			projectsDivs[1].classList.add('default-project')
			projectsDivs[1].classList.remove('projects-main-content')
			break;
	
		default:
			
			break;
	}
			prevProjBtn.value = selected.value
			prevProjBtn.firstChild.src = selected.firstChild.src
			chosenBtn.value = oldValue
			chosenBtn.firstChild.src = oldSrc
}