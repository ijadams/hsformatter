	       
		// Date/Time Picker
			//Month Picker
				for (i = 1; i < 13; i++){
				    $('#monthpicker').append($('<option />').val(i).html(i));
				}
					
			//Year Picker
				for (i = new Date().getFullYear(); i < 2020; i++){
				    $('#yearpicker').append($('<option />').val(i).html(i));
				}
					
			$('.timepicker').pickatime({
			  // Escape any “rule” characters with an exclamation mark (!).
			  format: 'T!ime selected: h:i a',
			  formatLabel: '<b>h</b>:i <!i>a</!i>',
			  formatSubmit: 'H',
			  hiddenPrefix: 'prefix__',
			  hiddenSuffix: '__suffix',
	            onSet: function(context) {
	              var obj = $('#' + this.get('id'));
	              var name = obj.prop('name');

	              console.log($('#from').val());
	              console.log($('[name=' + name + '_submit]').val());
	            }
			})

			var time_range;

			$(document).ready(function () {
			  //called when key is pressed in textbox
			  $("#quantity").keypress(function (e) {
			     //if the letter is not digit then display error and don't type anything
			     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			        //display error message
			        $("#errmsg").html("Digits Only").show().fadeOut("slow");
			               return false;
			    }
			   });
			});
			//Generate random time in given range
			$( "#target" ).submit(function( event ) {
				  alert( "Handler for .submit() called." );
				  event.preventDefault();
				});

		// End Date/Time Picker

		// Start Parse
			function myFunction() {
		// Parse TSV from Google Docs
	    var csvString = document.getElementById("contentCal").value;
        var output = '';
        var results = Papa.parse(csvString, {
                complete: function(results) {
                  output += results.data[0][3] + ',' + results.data[0][0] + '<br>';
                  console.log("Row:", results.data[0]);
                }
              });

        	// Get time range
			var floor = parseInt($('[name=prefix__from_time__suffix]').val());
			var roof = parseInt($('[name=prefix__to_time__suffix]').val()) - 1;

			// Get month to post ***STill need to CreatE USER FORM FOR MONTH 
			var month = parseInt($('#monthpicker').val()) - 1;
			
			// Get year to post ***StillNeed To CreatE User Form For YEAR
			var year = parseInt($('#yearpicker').val());

			// Format array of output values
			var output_array = $.map(results.data, function(row) {
				// Gen random times
 				 var hour = chance.hour({twentyfour: true, min:floor, max:roof });
				 var minute = chance.minute();
				 var posting_time = hour + ":" + minute;

				 // Format date of posting
				 var posting_date = moment(new Date(year, month, row[2]));
				 var posting_datetime = posting_date.format('MM/DD/YYYY') + " " + posting_time;

				 //Define CheckURL function
				 function checkURLforImage(url) {
				 		var e = document.createElement('a');
				 		e.href=url;
					    return(e.pathname.match(/\.(jpeg|jpg|gif|png|bmp)$/) != null);
					}

				 // Drop empty rows so they dont gen date/times
				 if (row[2] == "" && row[5] == "") {
				 	return [];
					// Check if URL ends with image extension
				 } else if (checkURLforImage(row[6]) == true){
				 	return [[
					 	posting_datetime,
					 	row[5]
					]];

				 } else {
					 return [[
					 	posting_datetime,
					 	row[5], 
					 	row[6]
				 ]]};
			});
		
			// Convert output array to CSV
			var csv = Papa.unparse(output_array);

			// Send CSV file to browser
				
			document.getElementById("parsedContent").innerHTML = csv;
	        $('#download_link').show().prop('href', "data:application/octet-stream," + encodeURIComponent(csv)).prop('download', 'hootsuite.csv');
					}
		// End Parse
