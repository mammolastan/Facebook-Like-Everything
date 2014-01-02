	/*
	I Like Everything
	Description: Like everything on your Facebook News Feed with this JavaScript Bookmarklet
	Original Author: Feross Aboukhadijeh
	Adapted by: Matthew Mammola
	Read more: http://feross.org/like-everything-on-facebook/
	*/
	
	var howMany;
	var sad = document.getElementsByTagName('*'),
    happy = [],
    halt = false;
	
	var happyDiv = document.createElement('div');
	happyDiv.innerHTML = '<div id=\'happy\' style=\'background-color:#ddd;font-size:16px;text-align:center;position:fixed;top:40px;right:40px;width:275px;height:500px;border:4px solid black;z-index:9999;padding-top:15px;\'> <h1> Auto-Like : Like All The Things! </h1> </div>';
	document.getElementsByTagName('body')[0].appendChild(happyDiv);
	
	//Input For How Many More Posts
	document.getElementById('happy').innerHTML=document.getElementById('happy').innerHTML + "<br> How many posts would you like to Like? <br> <br> Enter a number between 1 and 15 <br> <br> 1=Apprx 5 - 10 posts <br> 15=Apprx 100-120posts <br><br><input value=\"1=a little 15=A LOT!\" type=\"text\" maxlength=\"2\" id=\"howMany\">";

	//Add Begin Liking Option
	document.getElementById('happy').innerHTML=document.getElementById('happy').innerHTML + "<div id=\'startLiking\' style=\'margin-top:30px;\'><a id=\'beginLiking\' href=\'#\' style=\'display:block;\' onclick=\'scrollToDesiredLength();\'>Start Liking.</a></div>";

	//Add Scrolling Status Indicator
	document.getElementById('happy').innerHTML=document.getElementById('happy').innerHTML + "<div id=\'scrollingStatus\' style=\'margin-top:30px;\'> </div>";

	//Add Stop liking Option
	document.getElementById('happy').innerHTML=document.getElementById('happy').innerHTML + "<div id=\'happyStatus\' style=\'margin-top:30px;\'><a id=\'happyButton\' href=\'#\' style=\'display:block;\' onclick=\'haltFn();\'>Stop Liking.</a></div>";




	function scrollToDesiredLength()
	{
		
		if(howMany=parseInt(document.getElementById('howMany').value)){}
		else{alert("You must enter a number between 0 and 15. Script is broken");}
		if(howMany>=16)
		{
			alert("You entered a number higher than 15, this is WAY TOO MANY Posts and is not recommended");
		}

		
		OriginalHeight=document.body.scrollHeight;
		haltScrolling=false;
		window.scrollTo(0,OriginalHeight);
		var processScrollingFurther = window.setInterval(function(){hitBottom()},500);


		function hitBottom()
		{
			if (!haltScrolling)
			{
				var NewHeight=document.body.scrollHeight;
				window.scrollTo(0,NewHeight);
				if(NewHeight>=OriginalHeight*howMany)
					{
					   haltScrolling=true;
					}
				document.getElementById('scrollingStatus').innerHTML="Scrolling...<br> At " + Math.round(NewHeight/OriginalHeight) + " of " + howMany;
			}
			else
			{
				clearInterval(processScrollingFurther);
				document.getElementById('scrollingStatus').innerHTML="Done Scrolling";
				
				var sad = document.getElementsByTagName('*'),
					happy = [],
					halt = false;
					
				// Select only the Like buttons.
				// Convert the sad NodeList to a happy Array.
				for (var i = 0; i < sad.length; i++) {
					if (sad[i] && (sad[i].title == 'Like this')) {
						happy.push(sad[i]);
					}
				}
				
				//Add x of x items Liked 
				document.getElementById('happy').innerHTML=document.getElementById('happy').innerHTML + '<div id=\'counting\'> <br><br><span>0</span> of '+happy.length+' items liked.</div>';
				
				happyFn(happy);
			}
			
			
		}
	}

	function haltFn() {
		halt = true;
		return false; // prevent default event
	}

	function happyFn(happy) {
		if (halt || !happy || !happy.length) {
			document.getElementById('counting').innerHTML = 'Done!';
			return;
		}
		happy[0].click();
		happy[0].style.color='#FF0000';
		var countSpan = document.querySelector('#counting span');
		countSpan.innerHTML = parseInt(countSpan.innerHTML) + 1;
		
		// Wait for each Like to be processed before trying the next.
		// Facebook enforces this requirement.
		window.setTimeout(function() {
			happyFn(happy.splice(1));
		}, 5000);
	}
