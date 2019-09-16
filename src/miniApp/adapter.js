/***
 * 对小程序做适配
 */
if ( typeof document === "undefined" ) {

	global.document = {};

	document = global.document;
	document.createElementNS = function ( type, ele ) {

		if ( ele === 'img' ) {

			let image = document.canvas.createImage();
			this.initListener( image );
			image.onload = function () {

				this.triggerEventListener( 'load' );

			};
			image.onerror = function () {

				this.triggerEventListener( 'error' );

			};

			return image;

		}

	};

	document.initListener = function ( element ) {

		if ( ! element ) {

			element = this.canvas;

		}
		if ( ! element.listenerQueen ) {

			element.listenerQueen = {};

		}
		element.addEventListener = function ( eventName, callback ) {

			this.listenerQueen[ eventName ] = callback;

		};
		element.removeListener = function ( eventName ) {

			delete this.listenerQueen[ eventName ];

		};
		element.triggerEventListener = function ( eventName, event ) {

			event.preventDefault = function () { };
			event.stopPropagation = function () { };
			if ( event.touches ) {

				event.touches.forEach( ( item ) => {

					item.pageX = item.x;
					item.pageY = item.y;

				} );

			}
			this.listenerQueen[ eventName ]( event );

		};


	};

}

