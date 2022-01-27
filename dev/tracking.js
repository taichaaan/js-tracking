/*! tracking.js | v2.0.0 | license Copyright (C) 2020 - 2022 Taichi Matsutaka */
/*
 *
 * @name    : tracking.js
 * @content : tracking
 * @creation: 2020.11.03
 * @update  : 2022.01.27
 * @version : 2.0.0
 *
 */
(function(global) {[]
	global.tracking = function(target,options){
		///////////////////////////////////////////////////////////////
		// defaults options
		///////////////////////////////////////////////////////////////
		this.targetElements = Array.prototype.slice.call( document.querySelectorAll( target ) ,0) ;

		const defaults = {
			type                 : 'hover', // hover or click
			hoverSelector        : null,
			objectiveSelector    : null,
			direction            : 'vertical', // horizontal or vertical
			currentClass         : 'is-current',
			mouseleaveCurrentPosition: false,
			trackingStyle        : true,
			stalkerStyle         : true,
			stalkerClass         : ['js-tracking__stalker'],
			resize               : true,
		}


		///////////////////////////////////////////////////////////////
		// options
		///////////////////////////////////////////////////////////////
		for( let option in options){
			defaults[option] = options[option];
		}
		this.options = defaults;


		///////////////////////////////////////////////////////////////
		// base
		///////////////////////////////////////////////////////////////
		this.removes = [];
		this.base();


	};
	tracking.prototype = {
		base: function(){
			const _this   = this;
			const options = this.options;

			console.log( options );



			///////////////////////////////////////////////////////////////
			// addStalker
			///////////////////////////////////////////////////////////////
			const addStalker = function( objectiveTarget , target , stalker ){
				const width                = objectiveTarget.clientWidth;
				const heigiht              = objectiveTarget.clientHeight;
				const target_top           = target.getBoundingClientRect().top;
				const target_left          = target.getBoundingClientRect().left;
				const objectiveTarget_top  = objectiveTarget.getBoundingClientRect().top;
				const objectiveTarget_left = objectiveTarget.getBoundingClientRect().left;

				stalker.style.width  = width + 'px';
				stalker.style.height = heigiht + 'px';
				stalker.style.top    = objectiveTarget_top - target_top + 'px';
				stalker.style.left   = objectiveTarget_left - target_left + 'px';
			};


			///////////////////////////////////////////////////////////////
			// removeStalker
			///////////////////////////////////////////////////////////////
			let removeStalker =  null;

			if( options['mouseleaveCurrentPosition'] == true ){
				removeStalker = function( currentTarget , objectiveTarget , target , stalker ){
					stalker.classList.add('is-initial');
					stalker.classList.remove('is-move');
					addStalker( currentTarget , target , stalker );
				}
			} else{
				removeStalker = function( currentTarget , objectiveTarget , target , stalker ){
					stalker.classList.remove('is-move');
				}
			}





			this.targetElements.forEach(function(target) {

				///////////////////////////////////////////////////////////////
				// variable
				///////////////////////////////////////////////////////////////
				const hoverTargets = target.querySelectorAll( options['hoverSelector'] );



				///////////////////////////////////////////////////////////////
				// settings
				///////////////////////////////////////////////////////////////
				/////////////////////////////////////////////
				// stalker
				/////////////////////////////////////////////
				const stalker = document.createElement('span');

				for (var i = 0; i < options['stalkerClass'].length; i++) {
					stalker.classList.add( options['stalkerClass'][i] );
				}
				stalker.classList.add('is-initial');

				target.appendChild(stalker);

				if( options['stalkerStyle'] === true ){
					stalker.style.position = 'absolute';
					stalker.style.display  = 'block';
				}


				/////////////////////////////////////////////
				// target
				/////////////////////////////////////////////
				if( options['trackingStyle'] === true ){
					target.style.position = 'relative';
				}



				/////////////////////////////////////////////
				// objectiveTarget
				/////////////////////////////////////////////
				let currentTarget   = target.querySelectorAll( '.' + options['currentClass'] )[0];
				let objectiveTarget = '';

				if( options['mouseleaveCurrentPosition'] == true ){
					objectiveTarget = currentTarget;
				} else{
					if( options['objectiveSelector'] == null ){
						objectiveTarget = hoverTargets[0];
					} else{
						objectiveTarget = target.querySelectorAll( options['objectiveSelector'] )[0];
					}
				}

				/* ---------- init ---------- */
				addStalker( objectiveTarget , target , stalker );




				///////////////////////////////////////////////////////////////
				// event
				///////////////////////////////////////////////////////////////
				if( options['type'] === 'hover' ){
					/* ---------- hover ---------- */
					for ( let i = 0; i < hoverTargets.length; i++ ) {
						hoverTargets[i].addEventListener('mouseenter',function(){
							let _this       = this;
							objectiveTarget = this.querySelector( options['objectiveSelector'] );

							stalker.classList.remove('is-initial');
							stalker.classList.add('is-move');

							if( !objectiveTarget ){
								objectiveTarget = _this;
							}

							addStalker( objectiveTarget , target , stalker );
						});

						hoverTargets[i].addEventListener('mouseleave',function(){
							removeStalker( currentTarget , objectiveTarget , target , stalker );
						});
					}
				} else if( options['type'] === 'click' ){
					/* ---------- hover ---------- */
					for ( let i = 0; i < hoverTargets.length; i++ ) {
						hoverTargets[i].addEventListener('click',function(){
							if( !this.classList.contains( options['currentClass'] ) ){
								let _this       = this;
								objectiveTarget = this.querySelector( options['objectiveSelector'] );

								stalker.classList.remove('is-initial');
								stalker.classList.add('is-move');

								if( !objectiveTarget ){
									objectiveTarget = _this;
								}

								addStalker( objectiveTarget , target , stalker );
							} else{
								removeStalker( currentTarget , objectiveTarget , target , stalker );
							}
						});
					}
				}



				///////////////////////////////////////////////////////////////
				// resize
				///////////////////////////////////////////////////////////////
				if( options['resize'] === true ){
					const resizeEvent = function(){
						currentInit( target , stalker );
					}
					window.addEventListener('resize',resizeEvent);

					/* ---------- removes ---------- */
					_this.removes.push( function(){
						window.removeEventListener('resize',resizeEvent);
					});
				}



			});
		},
		remove: function(){
			/* removes に追加された関数をforで一つずつ実行する。 */
			const removes = this.removes;

			if( !removes ) return;

			for ( let i = 0; i < removes.length; i++ ) {
				removes[i]();
			}
		},
	};

})(this);
