window.grunticon = function( urls ){
	// expects a urls array with 3 items representing CSS paths to datasvg, datapng, urlpng
	if( !urls || urls.length !== 3 ){
		return;
	}

	// Thanks Modernizr & Erik Dahlstrom
	var w = window,
		svg = !!w.document.createElementNS && !!w.document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect && !!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") && !(window.opera && navigator.userAgent.indexOf('Chrome') === -1),
		ajax = function( url, callback ){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange=function(){
				if ( xmlhttp.readyState==4 && xmlhttp.status==200 ){
					callback( xmlhttp.responseText );
				}
			};
			xmlhttp.open( "GET", url, true );
			xmlhttp.send();
		},
		loadSVG = function(){
			var wrap = w.document.createElement( "div" );
			ajax( urls[ 0 ], function( text ){
				wrap.innerHTML = text;
				var svg =  wrap.firstChild;
				svg.style.cssText = "position: absolute; left: -99999px; top: -99999px; clip: rect(0,0,0,0);";
				w.document.documentElement.insertBefore( wrap.firstChild, w.document.documentElement.firstChild );
			} );
		},
		loadCSS = function( data ){
			var link = w.document.createElement( "link" ),
				ref = w.document.getElementsByTagName( "script" )[ 0 ];
			link.rel = "stylesheet";
			link.href = urls[ data ? 1 : 2 ];
			ref.parentNode.insertBefore( link, ref );
		};

		if( svg ){
			loadSVG();
		}
		else {

			// shim svg so it can be styled with a background image in IE
			document.createElement( "svg" );

			// Thanks Modernizr
			var img = new w.Image();

			img.onerror = function(){
				loadCSS( false );
			};

			img.onload = function(){
				loadCSS( img.width === 1 && img.height === 1 );
			};

			img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
		}
};
// Call grunticon() here to load CSS: