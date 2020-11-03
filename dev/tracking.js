/*!
 *
 * @name    : tracking.js
 * @content : tracking
 * @creation: 2020.11.03
 * @update  : 2020.00.00
 * @version : 1.0.0
 *
 * @license Copyright (C) 2020 Taichi Matsutaka
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



			///////////////////////////////////////////////////////////////
			// addTrackingActiveStyle
			///////////////////////////////////////////////////////////////
			let addTrackingActiveStyle;

			if( options['direction'] === 'vertical' ){
				addTrackingActiveStyle = function( childrenTarget , target , trackingTarget ){
					_this.addStyleVertical( childrenTarget , target , trackingTarget );
				}
			} else if( options['direction'] === 'horizontal' ){
				addTrackingActiveStyle = function( childrenTarget , target , trackingTarget ){
					_this.addStyleHorizontal( childrenTarget , target , trackingTarget );
				}
			}



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
					trackingTarget.style.display = 'block';
				}


				/////////////////////////////////////////////
				// target
				/////////////////////////////////////////////
				if( options['targetStyle'] === true ){
					target.style.position = 'relative';
				}



				/////////////////////////////////////////////
				// childrenTarget
				/////////////////////////////////////////////
				for ( let i = 0; i < childrenTarget.length; i++ ) {
					if(  childrenTarget[i].classList.contains( options['currentClass'] ) ){
						currentFlg = true;
					}
				}

				let currentTarget = target.querySelector( options['currentClass'] );

				if( !currentTarget ){
					currentTarget = childrenTarget[0];
					currentTarget.classList.add( options['currentClass'] );
				}



				///////////////////////////////////////////////////////////////
				// childrenTarget
				///////////////////////////////////////////////////////////////
				/* ---------- current ---------- */
				addTrackingActiveStyle( currentTarget , target , trackingTarget );

				if( options['type'] === 'hover' ){
					/* ---------- hover ---------- */
					for ( let i = 0; i < childrenTarget.length; i++ ) {
						childrenTarget[i].addEventListener('mouseenter',function(){
							trackingTarget.classList.remove('is-initial');
							trackingTarget.classList.add('is-move');
							addTrackingActiveStyle( this , target , trackingTarget );
						});

						childrenTarget[i].addEventListener('mouseleave',function(){
							trackingTarget.classList.add('is-initial');
							trackingTarget.classList.remove('is-move');
							addTrackingActiveStyle( currentTarget , target , trackingTarget );
						});
					}
				} else if( options['type'] === 'click' ){
					/* ---------- hover ---------- */
					for ( let i = 0; i < childrenTarget.length; i++ ) {
						childrenTarget[i].addEventListener('click',function(){
							if( !this.classList.contains( options['currentClass'] ) ){
								trackingTarget.classList.remove('is-initial');
								trackingTarget.classList.add('is-move');
								addTrackingActiveStyle( this , target , trackingTarget );
							} else{
								trackingTarget.classList.add('is-initial');
								trackingTarget.classList.remove('is-move');
								addTrackingActiveStyle( currentTarget , target , trackingTarget );
							}
						});
					}
				}

			});
		},
		addStyleVertical: function( childrenTarget , target , trackingTarget ){
			const heigiht         = childrenTarget.clientHeight;
			const target_top      = target.getBoundingClientRect().top;
			const childrenTarget_top = childrenTarget.getBoundingClientRect().top;

			trackingTarget.style.height = heigiht + 'px';
			trackingTarget.style.top    = childrenTarget_top - target_top + 'px';
		},
		addStyleHorizontal: function( childrenTarget , target , trackingTarget ){
			const width            = childrenTarget.clientWidth;
			const target_left      = target.getBoundingClientRect().left;
			const childrenTarget_left = childrenTarget.getBoundingClientRect().left;

			trackingTarget.style.width = width + 'px';
			trackingTarget.style.left  = childrenTarget_left - target_left + 'px';
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
