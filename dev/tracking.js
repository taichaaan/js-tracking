/*! tracking.js | v1.1.2 | license Copyright (C) 2020 - 2021 Taichi Matsutaka */
/*
 *
 * @name    : tracking.js
 * @content : tracking
 * @creation: 2020.11.03
 * @update  : 2021.01.11
 * @version : 1.1.2
 *
 */
(function(global) {[]
	global.tracking = function(target,options){
		///////////////////////////////////////////////////////////////
		// defaults options
		///////////////////////////////////////////////////////////////
		this.targetElements = Array.prototype.slice.call( document.querySelectorAll( target ) ,0) ;

		const defaults = {
			type            : 'hover', // hover or click
			currentClass    : 'is-current',
			childrenSelector: null,
			direction       : 'vertical', // horizontal or vertical
			targetStyle     : true,
			trackingStyle   : true,
			resize          : true,
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


			this.targetElements.forEach(function(target) {

				///////////////////////////////////////////////////////////////
				// variable
				///////////////////////////////////////////////////////////////
				const childrenTarget = target.querySelectorAll( options['childrenSelector'] );



				///////////////////////////////////////////////////////////////
				// settings
				///////////////////////////////////////////////////////////////
				/////////////////////////////////////////////
				// trackingTarget
				/////////////////////////////////////////////
				const trackingTarget = document.createElement('span');
				trackingTarget.classList.add('js-tracking');
				trackingTarget.classList.add('is-initial');
				target.appendChild(trackingTarget);

				if( options['trackingStyle'] === true ){
					trackingTarget.style.position = 'absolute';
					trackingTarget.style.display  = 'block';
				}


				/////////////////////////////////////////////
				// target
				/////////////////////////////////////////////
				if( options['targetStyle'] === true ){
					target.style.position = 'relative';
				}



				/////////////////////////////////////////////
				// currentTarget
				/////////////////////////////////////////////
				let currentTarget = target.querySelector( '.' + options['currentClass'] );

				if( !currentTarget ){
					currentTarget = childrenTarget[0];
					currentTarget.classList.add( options['currentClass'] );
				}

				/* ---------- init ---------- */
				_this.addStyle( currentTarget , target , trackingTarget );



				///////////////////////////////////////////////////////////////
				// event
				///////////////////////////////////////////////////////////////
				if( options['type'] === 'hover' ){
					/* ---------- hover ---------- */
					for ( let i = 0; i < childrenTarget.length; i++ ) {
						childrenTarget[i].addEventListener('mouseenter',function(){
							trackingTarget.classList.remove('is-initial');
							trackingTarget.classList.add('is-move');
							_this.addStyle( this , target , trackingTarget );
						});

						childrenTarget[i].addEventListener('mouseleave',function(){
							trackingTarget.classList.add('is-initial');
							trackingTarget.classList.remove('is-move');

							_this.currentInit( target , trackingTarget );
						});
					}
				} else if( options['type'] === 'click' ){
					/* ---------- hover ---------- */
					for ( let i = 0; i < childrenTarget.length; i++ ) {
						childrenTarget[i].addEventListener('click',function(){
							if( !this.classList.contains( options['currentClass'] ) ){
								trackingTarget.classList.remove('is-initial');
								trackingTarget.classList.add('is-move');
								_this.addStyle( this , target , trackingTarget );
							} else{
								trackingTarget.classList.add('is-initial');
								trackingTarget.classList.remove('is-move');

								_this.currentInit( target , trackingTarget );
							}
						});
					}
				}



				///////////////////////////////////////////////////////////////
				// resize
				///////////////////////////////////////////////////////////////
				if( options['resize'] === true ){
					const resizeEvent = function(){
						_this.currentInit( target , trackingTarget );
					}
					window.addEventListener('resize',resizeEvent);

					/* ---------- removes ---------- */
					_this.removes.push( function(){
						window.removeEventListener('resize',resizeEvent);
					});
				}



			});
		},
		currentInit: function( target , trackingTarget ){
			/*
			 * currentの場所へ戻す
			 * currentが変わっている可能性もあるため、再初期化
			 */
			const _this   = this;
			const options = this.options;
			const currentTarget = target.querySelector( '.' + options['currentClass'] );
			_this.addStyle( currentTarget , target , trackingTarget );
		},
		addStyle: function( currentTarget , target , trackingTarget ){
			const width              = currentTarget.clientWidth;
			const heigiht            = currentTarget.clientHeight;
			const target_top         = target.getBoundingClientRect().top;
			const target_left        = target.getBoundingClientRect().left;
			const currentTarget_top  = currentTarget.getBoundingClientRect().top;
			const currentTarget_left = currentTarget.getBoundingClientRect().left;

			trackingTarget.style.width  = width + 'px';
			trackingTarget.style.height = heigiht + 'px';
			trackingTarget.style.top    = currentTarget_top - target_top + 'px';
			trackingTarget.style.left   = currentTarget_left - target_left + 'px';
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
