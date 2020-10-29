/*!
 *
 * @name    : hoverTracking.js
 * @content : hoverTracking
 * @creation: 2020.10.28
 * @update  : 2020.00.00
 * @version : 1.0.0
 *
 * @license Copyright (C) 2020 Taichi Matsutaka
 *
 */
(function(global) {[]
	global.hoverTracking = function(target,options){
		///////////////////////////////////////////////////////////////
		// defaults options
		///////////////////////////////////////////////////////////////
		this.targetElements = Array.prototype.slice.call( document.querySelectorAll( target ) ,0) ;

		const defaults = {
			currentClass : 'is-current',
			hoverSelector: null,
			type         : 'vertical', // horizontal or vertical
			targetStyle  : true,
			trackingStyle: true,
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
	hoverTracking.prototype = {
		base: function(){
			const _this   = this;
			const options = this.options;



			///////////////////////////////////////////////////////////////
			// addTrackingActiveStyle
			///////////////////////////////////////////////////////////////
			let addTrackingActiveStyle;

			if( options['type'] === 'vertical' ){
				addTrackingActiveStyle = function( hoverTarget , target , trackingTarget ){
					_this.addStyleVertical( hoverTarget , target , trackingTarget );
				}
			} else if( options['type'] === 'horizontal' ){
				addTrackingActiveStyle = function( hoverTarget , target , trackingTarget ){
					_this.addStyleHorizontal( hoverTarget , target , trackingTarget );
				}
			}



			this.targetElements.forEach(function(target) {

				///////////////////////////////////////////////////////////////
				// variable
				///////////////////////////////////////////////////////////////
				const hoverTarget = target.querySelectorAll( options['hoverSelector'] );



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
					trackingTarget.style.display = 'block';
				}


				/////////////////////////////////////////////
				// target
				/////////////////////////////////////////////
				if( options['targetStyle'] === true ){
					target.style.position = 'relative';
				}



				/////////////////////////////////////////////
				// hoverTarget
				/////////////////////////////////////////////
				for ( let i = 0; i < hoverTarget.length; i++ ) {
					if( !hoverTarget[i].classList.contains( options['currentClass'] ) ){
						currentFlg = true;
					}
				}

				let currentTarget = target.querySelector( options['currentClass'] );

				if( !currentTarget ){
					currentTarget = hoverTarget[0];
					currentTarget.classList.add( options['currentClass'] );
				}



				///////////////////////////////////////////////////////////////
				// hoverTarget
				///////////////////////////////////////////////////////////////
				/* ---------- current ---------- */
				addTrackingActiveStyle( currentTarget , target , trackingTarget );

				/* ---------- hover ---------- */
				for ( let i = 0; i < hoverTarget.length; i++ ) {
					hoverTarget[i].addEventListener('mouseenter',function(){
						trackingTarget.classList.remove('is-initial');
						trackingTarget.classList.add('is-move');
						addTrackingActiveStyle( this , target , trackingTarget );
					});

					hoverTarget[i].addEventListener('mouseleave',function(){
						trackingTarget.classList.add('is-initial');
						trackingTarget.classList.remove('is-move');
						addTrackingActiveStyle( currentTarget , target , trackingTarget );
					});
				}


				/* ---------- removes ---------- */
				_this.removes.push( function(){
				});

			});
		},
		addStyleVertical: function( hoverTarget , target , trackingTarget ){
			const heigiht         = hoverTarget.clientHeight;
			const target_top      = target.getBoundingClientRect().top;
			const hoverTarget_top = hoverTarget.getBoundingClientRect().top;

			trackingTarget.style.height = heigiht + 'px';
			trackingTarget.style.top    = hoverTarget_top - target_top + 'px';
		},
		addStyleHorizontal: function( hoverTarget , target , trackingTarget ){
			const width            = hoverTarget.clientWidth;
			const target_left      = target.getBoundingClientRect().left;
			const hoverTarget_left = hoverTarget.getBoundingClientRect().left;

			trackingTarget.style.width = width + 'px';
			trackingTarget.style.left  = hoverTarget_left - target_left + 'px';
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
