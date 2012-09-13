// Tim's mapping functions
// Timothy C. Barmann
// tbarmann@projo.com
// 11/16/2010
// last revision 2/22/2011

/*
+ fields array now optional. It is created automatically if it doesn't exist. The label is set to the field's
	name; if a field's value is numeric, it is automatically set to be mapable
*/


function isNumeric(n) {
    var n2 = n;
    n = parseFloat(n);
    return (n!='NaN' && n2==n);
}



function getProperties(obj) {
  var i, v;
  var count = 0;
  var props = [];
  if (typeof(obj) === 'object') {
    for (i in obj) {
      v = obj[i];
      if (v !== undefined && typeof(v) !== 'function') {
        props[count] = i;
        count++;
      }
    }
  }
  return props;
};



String.prototype.stripNonNumeric = function() {
	var str = this;
	str += '';
	var rgx = /^\d|\.|-$/;
	var out = '';
	for( var i = 0; i < str.length; i++ ) {
		if( rgx.test( str.charAt(i) ) ) {
			if( !( ( str.charAt(i) == '.' && out.indexOf( '.' ) != -1 ) || ( str.charAt(i) == '-' && out.length != 0 ) ) ) {
				out += str.charAt(i);
			}
		}
	}
	return out;
};

/**
 * Formats the number according to the 'format' string; adherses to the american number standard where a comma is inserted after every 3 digits.
 *  note: there should be only 1 contiguous number in the format, where a number consists of digits, period, and commas
 *        any other characters can be wrapped around this number, including '$', '%', or text
 *        examples (123456.789):
 *          '0' - (123456) show only digits, no precision
 *          '0.00' - (123456.78) show only digits, 2 precision
 *          '0.0000' - (123456.7890) show only digits, 4 precision
 *          '0,000' - (123,456) show comma and digits, no precision
 *          '0,000.00' - (123,456.78) show comma and digits, 2 precision
 *          '0,0.00' - (123,456.78) shortcut method, show comma and digits, 2 precision
 *
 * @method format
 * @param format {string} the way you would like to format this text
 * @return {string} the formatted number
 * @public
 * from: http://mattsnider.com/javascript/numbers-and-number-format-function/
 */
Number.prototype.format = function(format) {
	if ((typeof format != 'string') || (format.length <1)) {return this;} // sanity check

	var hasComma = -1 < format.indexOf(','),
		psplit = format.stripNonNumeric().split('.'),
		that = this;

	var hasSign = (-1 < format.indexOf('+'));
	var isNotPositive = (parseFloat(this) <= 0);

	// compute precision
	if (1 < psplit.length) {
		// fix number precision
		that = that.toFixed(psplit[1].length);
	}
	// error: too many periods
	else if (2 < psplit.length) {
		throw('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format);
	}
	// remove precision
	else {
		that = that.toFixed(0);
	}

	// get the string now that precision is correct
	var fnum = that.toString();

	// format has comma, then compute commas
	if (hasComma) {
		// remove precision for computation
		psplit = fnum.split('.');
		
		var cnum = psplit[0],
			parr = [],
			j = cnum.length,
			m = Math.floor(j / 3),
			n = cnum.length % 3 || 3; // n cannot be ZERO or causes infinite loop

		// break the number into chunks of 3 digits; first chunk may be less than 3
		for (var i = 0; i < j; i += n) {
			if (i != 0) {n = 3;}
			parr[parr.length] = cnum.substr(i, n);
			m -= 1;
		}

		// put chunks back together, separated by comma
		fnum = parr.join(',');

		// add the precision back in
		if (psplit[1]) {fnum += '.' + psplit[1];}
	}

	if ((hasSign) && (isNotPositive)) {
		format = format.replace(/\+/,"");
	
	}
	// replace the number portion of the format with fnum
	return format.replace(/[\d,?\.?]+/, fnum);
};





// IE doesn't have Array.map, so this adds it

if (!Array.prototype.map)
{
  Array.prototype.map = function(fun /*, thisp */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t)
        res[i] = fun.call(thisp, t[i], i, t);
    }

    return res;
  };
}


String.prototype.replaceSpacesLowerCase = function() {
	var str = this.replace(/\s/g, '_');
	str = str.toLowerCase();
	return str;
};

String.prototype.restoreSpacesProperCase = function()
{
	var str = this.replace(/_/g, ' ');
    return str.toLowerCase().replace(/^(.)|\s(.)/g,
      function($1) { return $1.toUpperCase(); });
}


Array.prototype.getUnique = function () {
var hash = new Object();
for (j = 0; j < this.length; j++) {hash[this[j]] = true}
var array = new Array();
for (value in hash) {array.push(value)};
return array;
}

/* extractPropertyArray(array, prop)  ----------------------------------------- */
/* takes an array of objects and returns a single dimensional
array containing only the specified property:

var data = [{"fname":"bob", "lname":"smith"},
	{"fname":"john", "lname":"jones"},
	{"fname":"jimmy", "lname":"greenjeans"}
     ];	

var lastnames = extractPropertyArray(data, "lname");
lastnames will = ["smith","jones","greenjeans"];
*/
function extractPropertyArray(array, prop) {
  var values = array.map(function (el) {
    return (el[prop]);
  });
  return values;

}
/* -----------------------------------------------------------------*/


function sortfunction(a, b){
return (a - b) //causes an array to be sorted numerically and ascending
}


function generateColor(ranges) {
            if (!ranges) {
                ranges = [
                    [150,256],
                    [50, 190],
                    [50, 256]
                ];
            }
            var g = function() {
                //select random range and remove
                var range = ranges.splice(Math.floor(Math.random()*ranges.length), 1)[0];
                //pick a random number from within the range
                return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
            }
            var rgb = {};
            rgb.r = g();
            rgb.g = g();
            rgb.b = g();

            return '' + RGBToHex(rgb);
}


function initPalette() {
	// globals: field object, map_init object	
	// field.steps defined in setStepBounds()

	// if palette is defined already
	// just return

	if (field.hasOwnProperty('palette')) {
		if (field.palette.length > 1) {
			return;
		}
	}
	// there is no palette defined, or it contains only 1 color
	field.palette = [];
	if (field.hasOwnProperty('type')) {
		if (field.type == 'unique_value') {			
			for (var x=0;x<field.steps;x++) {
				field.palette[x] = generateColor();
			}
			return;
		}
	}
	else {
		field.type = 'range';
	}
	if (!field.hasOwnProperty('start_color')) {
		field.start_color = map_init.default_start_color;
	}
	
	if (!field.hasOwnProperty('end_color')) {
		field.end_color = map_init.default_end_color;
	}	
	field.palette = mixPalette(field.start_color,field.end_color,field.steps);
	return;
}



function mixPalette(start_hex,end_hex,steps) {

//	globals: field object

	var step = {};
	var start_rgb = hexToRGB(start_hex);
	var end_rgb = hexToRGB(end_hex);
	var this_palette = [];


	var denominator = (steps<2) ? 1 : steps-1;

	step.r = (end_rgb.r - start_rgb.r) / denominator;
	step.g = (end_rgb.g - start_rgb.g) / denominator;
	step.b = (end_rgb.b - start_rgb.b) / denominator;

	for (var i = 0; i < steps; i++) {
		var this_rgb = {};
		this_rgb.r = start_rgb.r + (step.r * i);
		this_rgb.g = start_rgb.g + (step.g * i);
		this_rgb.b = start_rgb.b + (step.b * i);
		this_palette.push(RGBToHex(this_rgb));
	}

	return this_palette;

}

function hexToRGB (color_str) {
	color_str = color_str.toUpperCase();
	color_str = color_str.replace(/[\#rgb\(]*/,'');
	if (color_str.length == 3) {
		var r = color_str.substr(0,1);
		var g = color_str.substr(1,1);
		var b = color_str.substr(2,1);
		color_str = r + r + g + g + b + b;
	}
	var red_hex = color_str.substr(0,2);
	var green_hex = color_str.substr(2,2);
	var blue_hex = color_str.substr(4,2);
	var this_color = {};
	this_color.r = parseInt(red_hex,16);
	this_color.g = parseInt(green_hex,16);
	this_color.b = parseInt(blue_hex,16);

	return this_color;
}


function RGBToHex (rgb) {

	var r = (parseInt(rgb.r,10)).toString(16);
	var g = (parseInt(rgb.g,10)).toString(16);
	var b = (parseInt(rgb.b,10)).toString(16);

	r= (r.length == 1) ? '0' + r : r;
	g= (g.length == 1) ? '0' + g : g;
	b= (b.length == 1) ? '0' + b : b;

	return (r+g+b).toUpperCase();

}

function initCoordinateCache() {


	var coordStr;
	var coordinateArray = [];
	var tempArray = [];
	$("area").each (function (i) {

		// get the coordinate pairs for this polygon area and put them in an array
		coordStr = $(this).attr('coords');
		tempArray =  coordStr.split(',');
		coordinateArray[i] = tempArray;
	});

	map_init.coordinateArrayCache = coordinateArray;
}



function mapResizePct(pct) {

	$("area").each (function (i) {

	// get the coordinate pairs for this polygon area and put them in an array
	var coordArry = map_init.coordinateArrayCache[i];

	for (var x=0;x<coordArry.length;x++) {
		coordArry[x] = Math.round(coordArry[x] * pct);
	}

	coordStr = coordArry.join();
	$(this).attr('coords',coordStr);
	});
}

function mapResizeWidth(width) {
	var maxXY = getMaxXY("area");
	var pct = width/maxXY.x;
	mapResizePct(pct);



}


function moveArea(id,x_offset,y_offset) {

	var selector = '#id_' + id + ',1';
	var coordStr = $(selector).attr('coords');
	var coordArry = coordStr.split(',');
	for (var x=0;x<coordArry.length;x+=2) {
		coordArry[x]*=1;
		coordArry[x+1]*=1;
		coordArry[x]+= parseInt(x_offset);
		coordArry[x+1]+= parseInt(y_offset);
	
	}
	coordStr = coordArry.join();
	$(selector).attr('coords',coordStr);
}




function locDataLookup(loc,field) {

// globals: map_init

 var join_field = map_init.join_field;

 loc = loc.replaceSpacesLowerCase();
 for (var x=0;x<map_init.datasource.length;x++) {
 	var new_loc_name = map_init.datasource[x][join_field].replaceSpacesLowerCase();
 	if (new_loc_name == loc)
 		return map_init.datasource[x][field.name];
	}
return 0;
}


// Point object
function Point(x,y) {
  this.x=x;
  this.y=y;
}

// Contour object
function Contour(a) {
  this.pts = []; // an array of Point objects defining the contour
}
// ...add points to the contour...

Contour.prototype.area = function() {
  var area=0;
  var pts = this.pts;
  var nPts = pts.length;
  var j=nPts-1;
  var p1; var p2;

  for (var i=0;i<nPts;j=i++) {
     p1=pts[i]; p2=pts[j];
     area+=p1.x*p2.y;
     area-=p1.y*p2.x;
  }
  area/=2;
  return area;
};

Contour.prototype.centroid = function() {
  var pts = this. pts;
  var nPts = pts.length;
  var x=0; var y=0;
  var f;
  var j=nPts-1;
  var p1; var p2;

  for (var i=0;i<nPts;j=i++) {
     p1=pts[i]; p2=pts[j];
     f=p1.x*p2.y-p2.x*p1.y;
     x+=(p1.x+p2.x)*f;
     y+=(p1.y+p2.y)*f;
  }

  f=this.area()*6;
  return new Point(parseInt(x/f),parseInt(y/f));
};


function shrinkArea(area,pct) {

	
	var minXY = getMinXY(area);

	var coordStr = $(area).attr('coords');
	var coordArry = coordStr.split(',');
	var newCoordStr = "";

	for (var j=0;j<coordArry.length;j+=2) {
		var x = parseInt(((coordArry[j] - minXY.x)*pct) + minXY.x);
		var y = parseInt(((coordArry[j+1] - minXY.y)*pct) + minXY.y);
		if (newCoordStr.length > 0) {
			newCoordStr += ", ";
		
		}
		newCoordStr += x + "," + y;
	}
	
	$(area).first().attr('coords',newCoordStr);
}


function getMaxPropValueInArray(arr,prop) {

	var unique_value = extractPropertyArray(arr,prop).sort(function(a,b){return a - b});
	return unique_value[unique_value.length-1];


}


function getMinPropValueInArray(arr,prop) {

	var unique_value = extractPropertyArray(arr,prop).sort(function(a,b){return a - b});
	return unique_value[0];


}




Array.maxProp = function (array, prop) {
  var values = array.map(function (el) {
    return el[prop];
  });
  return Math.max.apply(Math, values);
};


Array.minProp = function (array, prop) {
  var values = array.map(function (el) {
    return el[prop];
  });
  return Math.min.apply(Math, values);
};


function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}


function getLegendStep(target) {
// given a target value, searches through all datasource values of a particular field
// and figures out which step the target value belongs
// globals: datasource, field, steps, map_init

	if (field.type==="unique_value") {
		for (var x=0;x<field.values.length;x++) {
			if (field.values[x]==target) {
				return x;
			}
		}
	alert ("Error target in unique values not found: " + target);
	return null;
	}
	else {
		for (var index=0; index<field.boundaries.length; index++) {
			if ((target >= field.boundaries[index]['lower']) && (target < field.boundaries[index]['upper'])) {
				return index;
			}
		}
	
	alert ("Error target in boundaries array not found: " + target);
	return null;
	}

}

function extractLoc(thisOnMouseOverStr) {
	// Extract the parameter - this is the location name
	var thisOnMouseOverArray = thisOnMouseOverStr.split("'");
	var loc = thisOnMouseOverArray[1];
	loc = loc.replaceSpacesLowerCase();
	return loc;

}


function isEven(x) { return (x%2)?false:true; }
function isOdd(x) { return (x%2)?true:false; }


function mapOnMouseOver(loc){

	var lower_loc = loc.replace(" ","_");
	lower_loc = lower_loc.toLowerCase();
	var this_field_index = parseInt($('.map_chooser').val());
	
	var html = '<table class="tip_table">';
	html +='<tr>';
	html +='<td colspan="2">';
	html += '<div class="label_loc">';
	
	if (map_init.hasOwnProperty('join_field_label')) {
		html += map_init.join_field_label + ': ';
	
	}
	html += loc + '</div>';
	html += '</td></tr>';
	var rows = fields.length;
	for (var row = 0; row<rows; row++) {
	
		html+='<tr';
		if (isEven(row)) {
			html += ' class="even';
		}
		else {
			html += ' class="odd';
		}
		
		if (row === this_field_index) {
			html += " field_highlight";
		
		}
		html+='">';
		html +='<td>';	
		html +=fields[row].label;
		html +='</td>';	
		html +='<td>';	
		
		var data = locDataLookup(loc,fields[row]);
		
		if (fields[row].hasOwnProperty('format')===true) {
			data = data.format((fields[row].format));
		}
		html += data;
		html += '</td></tr>';
	} 
	html += '</table>';
	Tip(html);
}


function buildLegend () {

	// global objects: map_init, field
	
	
	var html='<table class="map_legend">';
	html += '<tr><td colspan="2"><div class="legend_heading">' + field.label + '</div></td></tr>';

	for (var index=0; index<field.steps; index++) {
		
		if  (field.type==="unique_value") {
			if (isNumeric(field.values[index])) {
				var desc = parseFloat(field.values[index]);
				desc = desc.format(field.format);
			}
			else {
				desc = field.values[index].restoreSpacesProperCase();
			
			}		
		}
		else {
			var lower_range = field.boundaries[index]['lower'].format(field.format);
			var upper_range = field.boundaries[index]['upper'].format(field.format);
			var desc = lower_range + ' to ' + upper_range;
		}
		
	
		mouseOverStr  = 'onMouseOver="highlight_areas(\'step_' + index + '\');"';
		mouseOverStr += ' onMouseOut="unhighlight_areas(\'step_' + index + '\');"';
		html +='<tr>';
		html +='<td><div class="color_box" ' + mouseOverStr + ' style="background:#' + getPaletteColor(index) + ';">&nbsp;</div></td>';
		html +='<td>' + desc +  '</td>';
		html +='</tr>';
		}
	html +='</table>';
	

	$('.legend_div').html(html);
	return;
}


function initFields () {
	// if the field does not have a label property, add one using the field's name
	// global objects: map_init, fields
	
	
	if (typeof(datasource) === 'undefined') {
		alert ("Error: Data source has not been defined.");
		return;
	}
	
	if (typeof(fields) === 'undefined') {
		
		// create global array called fields
		fields = new Array();
		
		var props = getProperties(datasource[0]);
		for (var index=0; index<props.length; index++) {
			fields[index] = {"name": props[index]};
		}	
	}
	
	
	for (var index=0; index< fields.length; index++) {
		var this_field = fields[index];
		if (!this_field.hasOwnProperty('label')) {
				this_field.label = this_field.name;				
		}
		
		// multiplier property is used for percentages that need to be multiplied by 100
		// if found, it goes through each object inside the datasource and multiplies
		// the given field by the multiplier
		
		if (this_field.hasOwnProperty('multiplier')) {
			var multiplier = this_field.multiplier;
			$.each(datasource, function(x, value) { 
				value[this_field.name] *= multiplier;
		});
			
		}
		
		if (!this_field.hasOwnProperty('mapable')) {
			this_field.mapable = isNumeric(datasource[0][this_field.name]) ;
		}		
	}
}



function setStepBounds () {

	// global objects: map_init, field
	
	// if the file type is unique_value, the number of steps = the number of unique values in the dataset
	// if we haven't done so already, get all the unique values, sorted, and save them to be used to build
	// the legend - buildLegend(), and then return. No need to determine boundaries.
		
	
	if (field.hasOwnProperty('type')) {
		if (field.type === 'unique_value') {
			if (!field.hasOwnProperty('values')) {
				field.values = extractPropertyArray(map_init.datasource,field.name).getUnique().sort(function(a,b){return a - b});
				field.steps = field.values.length;
				return;
			}
		}
	}
	
	field.type = 'range';
	
	// Find out how many steps. 
		
	// if the boundaries have already been set because we've already been here
	// or the user has defined the boundaries in the field definition, just set the steps
	// and return. No need to classify.
	
	if (field.hasOwnProperty('boundaries')) {
		field.steps = field.boundaries.length;
		return;
		
	}
	
	
	// no boundaries set yet
	// if a palette has been set, set steps to palette length
	
	if (field.hasOwnProperty('palette')){
		field.steps = field.palette.length;
	
	}

	// if we haven't set steps by now, or the number of steps were not defined by user
	// in field definition object, use the default steps value
	if (!field.hasOwnProperty('steps')){
			field.steps = map_init.default_steps;
		
	}
		
	// now classify	
	
	if (!field.hasOwnProperty('max_value')) {
		field.max_value =  Math.ceil((getMaxPropValueInArray(map_init.datasource, field.name))) + 1; // adding 1 ensures that target will be < max
	
	}
	if (!field.hasOwnProperty('min_value')) {
		field.min_value =  Math.floor((getMinPropValueInArray(map_init.datasource, field.name)));
	
	}
	var max =  field.max_value;
	var min =  field.min_value;
    	var range = max-min;

	if (field.hasOwnProperty('interval')) {
			field.steps =  Math.ceil(range/field.interval);	
	}
	else {
		field.interval = range/field.steps;
	
	}
	
	var steps = field.steps;
    	var interval = field.interval;
	field.boundaries = [];
	var lower_bound = min;

	for (var index=0; index<steps; index++) {
		field.boundaries[index]= {'lower':lower_bound, 'upper':lower_bound + interval};
		lower_bound += interval;
	
	}
	return field;
}





function highlight_areas(e) {


	$('area').each (function(i) {
		var this_class = $(this).attr('class');
		this_class=this_class.replace("fillOpacity:1","fillOpacity:0.1");
		$(this).attr('class', this_class);
	});

	
	$('area.' + e).each (function(i) {
		var this_class = $(this).attr('class');
		this_class=this_class.replace("fillOpacity:0.1","fillOpacity:1");
		$(this).attr('class', this_class);
	});
	$('.map').maphilight();

}

function unhighlight_areas(e) {


	$('area').each (function(i) {
		var this_class = $(this).attr('class');
		this_class=this_class.replace("fillOpacity:0.1","fillOpacity:1");
		$(this).attr('class', this_class);
	});



	$('.map').maphilight();

}


function getMaxXY (selector) {
	var xArry = [];
	var yArry = [];
	$(selector).each (function (i) {
		// get the coordinate pairs for each polygon area and put them in an array
		var coordStr = $(this).attr('coords');
		var coordArry = coordStr.split(',');

		// split off the x's in one array, the y's in another
		for (x=0;x<coordArry.length;x+=2) {
			xArry.push(parseInt(coordArry[x]));
			yArry.push(parseInt(coordArry[x+1]));
		}

	}); // each

	// get max,min, average for the x's and y's
	// the average x,y will be the center of the square that bounds the polygon
	var xmax = Math.max.apply(Math, xArry);
	var ymax = Math.max.apply(Math, yArry);
	return new Point(xmax,ymax);

}

function getMinXY (selector) {
	var xArry = [];
	var yArry = [];
	$(selector).each (function (i) {
		// get the coordinate pairs for each polygon area and put them in an array
		var coordStr = $(this).attr('coords');
		var coordArry = coordStr.split(',');

		// split off the x's in one array, the y's in another
		for (x=0;x<coordArry.length;x+=2) {
			xArry.push(parseInt(coordArry[x]));
			yArry.push(parseInt(coordArry[x+1]));
		}

	}); // each

	// get min for the x's and y's

	var xmin = Math.min.apply(Math, xArry);
	var ymin = Math.min.apply(Math, yArry);
	return new Point(xmin,ymin);

}


function lookupVal(location) {

	var datasource = map_init.datasource;

	var join_field = map_init.join_field;


	if (field.hasOwnProperty('map_display_field')===true) {
		var property = field.map_display_field;
	}
	else {
		var property = field.name;
	
	}

	
	for (var x=0;x<datasource.length;x++) {
		if (datasource[x][join_field] === location) {
			return datasource[x][property];
		}	
	}
	return "?";
}


function getFieldIndexByName (fieldname) {
	for (var x=0;x<fields.length;x++) {
		if (fields[x].name==fieldname) {
			return x;
		}
	}
	return 0;
}


function labelMap () {
	// set image to the correct dimensions
	var maxXY = getMaxXY("area");

	$('.map_container').css('width',maxXY.x + 'px');
	$('.map_container').css('height',maxXY.y + 'px');


	$('.map').css('width',maxXY.x + 'px');
	$('.map').css('height',maxXY.y + 'px');
	
	$('.map img').attr('width',maxXY.x);
	$('.map img').attr('height',maxXY.y);

	
	

 	var label_div_content = "";

	$("area").each (function (i) {

		//get the onMouseOver attribute
		var thisOnMouseOver = $(this).attr('onMouseOver');
		var thisOnMouseOverStr = thisOnMouseOver.toString();
		var this_loc = extractLoc(thisOnMouseOverStr);
		var this_value = lookupVal(this_loc.restoreSpacesProperCase());
		
	//	this_value = this_value.format(field.format);
		var label = this_loc.restoreSpacesProperCase();
		
		
		// see if we want the map labels to show location or the value for this field
		if (field.hasOwnProperty('map_display')) {
			if (field.map_display === "value") {
				label = this_value;
			
			}
		}
		
		// find the centroid coordinates for this polygon area - this is where the label goes
		// get the coordinate pairs for this polygon area and put them in an array
		var coordStr = $(this).attr('coords');
		var coordArry = coordStr.split(',');
		var perimeter = new Contour();

		for (var j=0;j<coordArry.length;j+=2) {
			var this_point = new Point(parseInt(coordArry[j]),parseInt(coordArry[j+1]));
			perimeter.pts.push(this_point);
		}
		var this_centroid_pt = perimeter.centroid();

		// create a style based on the centroid x,y coordinates
		var this_style = 'left:' + this_centroid_pt.x + 'px; top:' + this_centroid_pt.y + 'px; ';
		var this_id = this_loc + '_label';

		// create a div and put in the style with the coordinates
		label_div_content += '<div onMouseOver="mapOnMouseOver(\'' + this_loc.restoreSpacesProperCase() + '\');" class="map_label"';
		label_div_content += ' style="' + this_style + '" ';
		label_div_content += ' id="' + this_id + '" ';
		label_div_content += '>' + label  + '</div>';

	});  // end of each
	$('#label_div').html(label_div_content);
}


function getPaletteColor(index) {


	// global field
	if (field.palette.length>index) {
		return field.palette[index];
	}
	return "000000";  

}


function colorMap() {
	

	// global objects: map_init, field
	
	var join_field = map_init.join_field;
	var datasource = map_init.datasource;
	
	$("area").each (function (i) {
		for (var row in datasource) {
			if (datasource[row][join_field]===undefined) {
				console.log ('No join field found for row' + row);
				continue;
			}
			
			var this_loc = datasource[row][join_field].replaceSpacesLowerCase();			
			var thisOnMouseOver = $(this).attr('onMouseOver');
			var loc = extractLoc(thisOnMouseOver.toString());
			if (loc===this_loc) {
				var this_field_value = datasource[row][field.name];
				var step = getLegendStep(this_field_value);
				var color=getPaletteColor(step);
				var new_class = "step_" + step + " {strokeColor:'FFFFFF',strokeWidth:1,fillColor:'" + color + "',fillOpacity:1,alwaysOn:true,fade:false}";
				$(this).attr('class', new_class);
				$(this).attr('id', 'id_' +loc );
				break;
			}	// end if
		}  // end for
	}); // end each

	
	
}	
	

function zoom_in() {

	var current_width = parseInt(map_init.map_width);
	
	if (!map_init.hasOwnProperty('map_width_default')) {
		map_init.map_width_default = current_width;
	}	
	var new_width = parseInt(current_width * 0.1) + current_width;
	map_init.map_width = new_width;
	mapResizeWidth(new_width);
	labelMap();
	colorMap();
	buildLegend();
	$('.map').maphilight();
	
	// place legend div
	var legend_width = parseInt($('.map_legend').css('width'));
	var container_width = parseInt($('.map_container').css('width'))+legend_width_offset;
	$('.map_legend').css('left',(container_width-legend_left_offset)+'px');
	$('.map_legend').css('top',0 + legend_top_offset + 'px');

	
	

}

function zoom_out() {
	var current_width = parseInt(map_init.map_width);
	
	if (!map_init.hasOwnProperty('map_width_default')) {
		map_init.map_width_default = current_width;
	}
	var new_width = current_width - parseInt(current_width * 0.1);
	map_init.map_width = new_width;
	mapResizeWidth(new_width);
	labelMap();
	colorMap();
	buildLegend();
	$('.map').maphilight();

	// place legend div
	var legend_width = parseInt($('.map_legend').css('width'));
	var container_width = parseInt($('.map_container').css('width'))+legend_width_offset;
	$('.map_legend').css('left',(container_width-legend_left_offset)+'px');
	$('.map_legend').css('top',0 + legend_top_offset + 'px');



}