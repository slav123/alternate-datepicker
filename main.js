var app = {
    months: ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Oct", "Dec"],
    generate: function () {
        
        var main = document.createElement("div"), 
            century = document.createElement("div"),
            ul_century = document.createElement("ul");
        
        main.setAttribute("id", "sdp");
        
        // century
        century.setAttribute('class', 'qt century');
        
        
        for (var a = 2000; a >= 1800; a-= 100) {
            var li = document.createElement("li");
            li.innerHTML = "<span>" + a + "</span>";
            li.setAttribute("data-id", a);
            ul_century.appendChild(li);
            li.addEventListener("click", function(ev, a)  {
                app.bind('century', this.getAttribute("data-id"));
            });
        }
        century.appendChild(ul_century);
        main.appendChild(century);
        
        // decade
        var decade = document.createElement("div"),
            ul_decade = document.createElement("ul")
        
        decade.setAttribute('class', 'qt decade');
        
        for (a = 90; a >= 0; a-= 10) {
            var li = document.createElement("li");
            li.innerHTML = a;
            ul_decade.appendChild(li);
        }
        
        decade.appendChild(ul_decade);
        main.appendChild(decade);
        
        // year 
        var year = document.createElement("div");
        year.setAttribute('class', 'qt year');
        var ul_year = document.createElement("ul");
        for (a = 9; a >= 0; a-= 1) {
            var li = document.createElement("li");
            li.innerHTML = a;
            ul_year.appendChild(li);
        }
        
        year.appendChild(ul_year);
        main.appendChild(year);
        
        // month
        var month = document.createElement("div");
        month.setAttribute("class", "qt month");
        var ul_month = document.createElement("ul");
        for (a = 11; a >= 0; a-= 1) {
            var li = document.createElement("li");
            li.innerHTML = app.months[a]
            ul_month.appendChild(li);
        }
        month.appendChild(ul_month);
        main.appendChild(month);

        // day
        var day = document.createElement("div");
        day.setAttribute("class", "qt day");
        var ul_day = document.createElement("ul");
        for (a=31; a > 0; a-=1) {
            var li = document.createElement("li");
            li.innerHTML = a;
            ul_day.appendChild(li);
        }
        day.appendChild(ul_day);
        main.appendChild(day);

        console.log(main);
        document.body.appendChild (main);
        
    },
    bind: function(what, value) {
        console.log(what, value);
    }
 }

document.addEventListener("DOMContentLoaded", function(event) { 
    app.generate();
        
});