/*jslint node: true */
"use strict";



var app = {
    months: ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Oct", "Dec"],
    preview: document.createElement("div"),
    century: 0,
    decade: 0,
    year: 0,
    month: 0,
    day: 0,
    days: 0,
    classes: {'century' : 3, 'decade' : 10, 'year' : 10, 'month' : 12, 'day' : 4, 'days': 10 },
    generate: function () {
        
        var main = document.createElement("div"),
            wrapper = document.createElement("div"),
            century = document.createElement("div"),
            ul_century = document.createElement("ul"),
            a = 0;
        
        main.setAttribute("id", "sdp");
        app.preview.setAttribute("class", "preview");
        wrapper.setAttribute("class", "wrapper");
        
        // preview
        main.appendChild(app.preview);
        main.appendChild(wrapper);
        
        // century
        century.setAttribute('class', 'qt century');
        
        
        for (a = 2000; a >= 1800; a -= 100) {
            var li = document.createElement("li");
            li.innerHTML = "<span>" + a + "</span>";
            li.setAttribute("data-id", a);
            ul_century.appendChild(li);
            
            // listen on click
            li.addEventListener("click", function (ev) {
                app.bind('century', this);
            });
        }
        century.appendChild(ul_century);
        wrapper.appendChild(century);
        
        // decade
        var decade = document.createElement("div"),
            ul_decade = document.createElement("ul");
        
        decade.setAttribute('class', 'qt decade');
        
        for (a = 90; a >= 0; a -= 10) {
            li = document.createElement("li");
            li.innerHTML = a;
            li.setAttribute("data-id", a);
            ul_decade.appendChild(li);
            
            // listen on click
            li.addEventListener("click", function (ev) {
                app.bind('decade', this);
            });
        }
        
        decade.appendChild(ul_decade);
        wrapper.appendChild(decade);
        
        // year 
        var year = document.createElement("div");
        year.setAttribute('class', 'qt year');
        var ul_year = document.createElement("ul");
        for (a = 9; a >= 0; a-= 1) {
            var li = document.createElement("li");
            li.innerHTML = a;
            li.setAttribute("data-id", a);
            ul_year.appendChild(li);
            
            li.addEventListener("click", function (ev)  {
                app.bind('year', this);
            });
        }
        
        year.appendChild(ul_year);
        wrapper.appendChild(year);
        
        // month
        var month = document.createElement("div");
        month.setAttribute("class", "qt month");
        var ul_month = document.createElement("ul");
        for (a = 11; a >= 0; a-=1) {
            li = document.createElement("li");
            li.innerHTML = app.months[a]
            li.setAttribute("data-id", a);
            ul_month.appendChild(li);
            
            li.addEventListener("click", function(ev)  {
                app.bind('month', this);
            });
        }
        month.appendChild(ul_month);
        wrapper.appendChild(month);

        // day
        var day = document.createElement("div");
        day.setAttribute("class", "qt day");
        var ul_day = document.createElement("ul");
        for (a=3; a >= 0; a-=1) {
            var li = document.createElement("li");
            li.innerHTML = a;
            li.setAttribute("data-id", a);
            ul_day.appendChild(li);
            
            li.addEventListener("click", function (ev)  {
                app.bind('day', this);
            });
            
        }
        day.appendChild(ul_day);
        wrapper.appendChild(day);
        
        // days
        var days = document.createElement("div");
        days.setAttribute("class", "qt days");
        var ul_days = document.createElement("ul");
        for (a=9; a >= 0; a-=1) {
            var li = document.createElement("li");
            li.innerHTML = a;
            li.setAttribute("data-id", a);
            ul_days.appendChild(li);
            
            li.addEventListener("click", function (ev)  {
                app.bind('days', this);
            });
            
        }
        days.appendChild(ul_days);
        wrapper.appendChild(days);

        console.log(main);
        document.body.appendChild (main);
        
    },
    removeClassLoop: function(ul) {
        for( var i = 0 , j = ul.length; i < j ; i++ ) {
            app.removeClass(ul[i]);
        }
        
    },
    bind: function(what, element) {
        
        // remove active class
        var ul = document.getElementById('sdp').getElementsByClassName(what)[0].getElementsByTagName("li");
          
        app.removeClassLoop(ul);
        
        // set active
        element.className = element.className + " active";
        
        // get value
        var value = element.getAttribute("data-id");
        value = parseInt(value, 10);
        
        switch(what) {
            case 'century':
                app.century = value;
            break;
            case 'decade':
                app.decade = value;
            break;
            case 'year':
                app.year = value;
            break;
            case 'month':
                app.month = value;
            break;
            case 'day':
                app.day = value;
            break;
            case 'days':
                app.days = value;
            break
        }
        
        console.log(what, value);
        
        // calculate year month and day
        var year = app.century + app.decade + app.year;
        var month = app.month + 1;      
        var day = (app.day * 10) + app.days;
        
        if (year > 1800 && month > 0) {
            var max = app.daysinMonthfromInput(month, year);
            
            console.log(max, day);
            
            // if da
            if (day > max) {
                // disable 3
                var ul_day = document.getElementById('sdp').getElementsByClassName('day')[0].getElementsByTagName("li");
                
                // if max days > 30 move to 20
                if (max < 30) {
                    app.removeClass(ul_day[0]);
                    ul[1].className = element.className + " active";
                    app.day = 2;
                } 
                
                // setup last digit
                var digit = max.toString()[1];
                var index = 9 - digit;
                console.info('index', index);
                
                var ul_days = document.getElementById('sdp').getElementsByClassName('days')[0].getElementsByTagName("li");
                app.removeClassLoop(ul_days);
                ul_days[index].className = element.className + " active";
                app.days = digit;
                day = max;
            }
        }
        
        app.preview.innerHTML = year + '-' + month + '-' + day;  
    },
  
    // day in month
    daysinMonthfromInput: function (month, year) {
        return (new Date(year,month-1,1)).daysinMonth();
    },
    removeClass: function(el) {
        
        el.className = el.className.replace( /(?:^|\s)active(?!\S)/g , '' )
    },
    scale: function() {
        
         var offsetHeight = document.getElementById('sdp').getElementsByClassName("wrapper")[0].offsetHeight;
          
         for (var c in app.classes) {
            var li = document.getElementById('sdp').getElementsByClassName(c)[0].getElementsByTagName('li');
            var height = offsetHeight / app.classes[c];
             
            var p = (height * 100) / offsetHeight;
            app.setStyle(li, p);
         }
         
        
    },
    setStyle: function(elements, height) {
        for (var i = 0; i < elements.length; i++) {
     
            elements[i].style.height = height + '%';
        }
    }
 }

// count days in month
Date.prototype.daysinMonth = function () {
    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return d.getDate();
};

document.addEventListener("DOMContentLoaded", function(event) { 
    app.generate();
    app.scale();
});


