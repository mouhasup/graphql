

export const drawGraphics = {
    drawline(x1,y1,x2,y2, style) {
        // Create the line element
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('style', style);

    return line;
    },
    drawBarreGraphic(dataX, dataY, barWidth, barColor) {
        // Supposons que dataX et dataY sont des tableaux de valeurs pour les axes X et Y
        // barWidth est la largeur de chaque barre
        // barColor est la couleur de chaque barre

        // Parcourir les données pour dessiner chaque barre
        for (let i = 0; i < dataX.length; i++) {
            const xValue = dataX[i];
            const yValue = dataY[i];

            // Calculer la position de la barre
            const barX = xValue * barWidth;
            const barY = yValue; // La hauteur de la barre sera basée sur la valeur de yValue

            // Créer un rectangle SVG pour représenter la barre
            const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bar.setAttribute('x', barX);
            bar.setAttribute('y', barY);
            bar.setAttribute('width', barWidth);
            bar.setAttribute('height', yValue); // La hauteur de la barre est égale à la valeur de yValue
            bar.setAttribute('fill', barColor);

            // Ajouter la barre à l'élément SVG
            // Ici, vous devrez ajouter la barre à l'élément SVG approprié dans votre DOM
            // Par exemple, si vous avez un élément SVG nommé 'chart' :
            // chart.appendChild(bar);
        }
    },
    drawBarreGraphic2(datas,height, barWidth, wspace,barColor) {
        // datas est un tableau bidimensionnel où chaque sous-tableau représente une série de données
        // barWidth est la largeur de chaque barre
        // barColor est la couleur de chaque barre

        // Parcourir les données pour dessiner chaque barre
        let svgWidth = Object.values(datas).length*(barWidth+wspace);
        let maxVal = Math.max(...Object.values(datas))
        console.log("maxVal: " + maxVal)
        const svg = this.createSVGElementWithViewbox(svgWidth,height)

        let a = wspace
        console.log("datasss:", datas);
        Object.keys(datas).forEach((key, seriesIndex) => {
            const yValue = datas[key];

            // Créer un rectangle SVG pour représenter la barre
            const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bar.setAttribute('x', a);
            bar.setAttribute('y', -(yValue/maxVal)*height);
            bar.setAttribute('width', barWidth);
            bar.setAttribute('height', (yValue/maxVal)*height); // La hauteur de la barre est basée sur la différence entre la valeur maximale et la valeur actuelle
            bar.setAttribute('fill', barColor);
            bar.style.cursor = "pointer"
            bar.style.transition = "fill 0.3s ease"
            const barename = this.addText(bar.getAttribute('x'),key.replace("_"," "),-height*1.15,4);
                barename.style.display = 'none';
            const bareval = this.addText(bar.getAttribute('x'),yValue,-(yValue/maxVal)*height-3,4);
                  bareval.style.display = 'none';
            svg.appendChild(bareval)
            svg.appendChild(barename)
            bar.addEventListener('mouseover', () => {
                bar.style.fill = "white"
                barename.style.display = "block"
                bareval.style.display = 'block';
            })
            bar.addEventListener('mouseout', () => {
                bar.style.fill = barColor
                barename.style.display = "none"
                bareval.style.display = 'none';
            })

            a = a + barWidth+wspace

            svg.appendChild(bar);
        });
        // Implémenter les axs
            this.addAxes(svgWidth, height,svg,1,"#cbbdbd","xp","skills",5)

        return svg
    },
    drawLinerGraphic(datas,width, height,dotWidth,barColor) {
        console.log("data to draw: ",datas)
        const  svg = this.createSVGElementWithViewbox(width, height)
        this.addAxes(width, height,svg,1,"#cbbdbd","xp","date",25)
        
        // Créer un élément path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'red');
        path.setAttribute('stroke-width', '2');

        // Calculer les points de la courbe
        console.log("height:", width);
        console.log("max:", datas.date.max)
        const points = datas.datas.map(item => {
        const x = (item.date/datas.date.max)*width;
        const y = -(item.amount/datas.amount.max)*height;
        this.createCircle(svg,x,y,5,"#918b8b",item.amount+" xp", item.createdAt.substring(0,10))
        // svg.appendChild(dot)
        return `${x},${y}`;
        }).join(' ');
        
        path.setAttribute('d', `M${points}`);

        svg.appendChild(path);

        return svg
    },
    createSVGElementWithViewbox(width, height) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', `-5 -${height*1.3} ${width*1.3} ${height*1.4}`);
        return svg;
    },
    createTableFromData(data) {
        // Créer un élément table
        const table = document.createElement('table');
    
        // Créer un élément tbody pour contenir les lignes de la table
        const tbody = document.createElement('tbody');
    
        // Ajouter les lignes de la table
        for (const key in data) {
            const row = document.createElement('tr');
    
            // Créer une cellule pour la clé (colonne  1)
            const keyCell = document.createElement('td');
            keyCell.textContent = key;
            row.appendChild(keyCell);
    
            // Créer une cellule pour la valeur (colonne  2)
            const valueCell = document.createElement('td');
            valueCell.textContent = data[key];
            row.appendChild(valueCell);
    
            // Ajouter la ligne à tbody
            tbody.appendChild(row);
        }
    
        // Ajouter tbody à la table
        table.appendChild(tbody);
    
        // Retourner la table créée
        return table;
    },
    creatauditbox(data){
        console.log("audit data:",data)
        const audit = document.querySelector(".audits")
        let auditMsg = ""
        data.ratio > 1.1 ? auditMsg="you are good" : auditMsg="make more audit";
        let up = 0
        let down = 0
        if (data.up > data.down ) {
            up = 100
            down = (data.down/data.up)*100
        }else {
            down = 100
            up = (data.up/data.down)*100
        }
        audit.innerHTML = `
        <div>
      <div class="audlabel">Audit ratio</div>
      <div class="auditGraph">
        <div class="auditsvg">
          <svg height="60" width="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="4" x2="${up}%" y2="4" style="stroke:red;stroke-width:5" />
            <line x1="0" y1="50" x2="${down}%" y2="50" style="stroke:red;stroke-width:5" />
          </svg>
        </div>
        <div class="auditdatas">
          <div class="audval">${data.up} MB</div>
          <div class="audata">
              <div class="audtext">Done</div>
              <div class="audsvg">
                  <svg width="12" viewBox="0 0 130 130">
                      <path fill="red" stroke="red" stroke-width="6" d="M17.35 55.4L65 7.75l47.65 47.65M65 122.75V8.41"></path>
                  </svg>
              </div>
          </div>
          
  
          <div class="audata">
              <div class="audtext">Received</div>
              <div class="audsvg">
                  <svg width="12" viewBox="0 0 130 130">
                      <path fill="red" stroke="red" stroke-width="6" d="M114.65 73.1L67 120.75 19.35 73.1M67 5.75v114.34"></path>
                  </svg>
              </div>
          </div>
          <div class="audval">${data.down} MB</div>
        </div>
      </div>
      </div>
    <div class="auditMessage"> 
      <div class="amv">${data.ratio}</div>
      <div class="amt">${auditMsg}</div>
    </div>
        `
    },
    addText(x,key,height,textsize) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x); // Centre horizontalement le texte sur la barre
        text.setAttribute('y', height); // Positionnez le texte juste au-dessus de la barre
        text.textContent = key; // Utilisez un attribut personnalisé pour le texte
        // text.style.display = 'none'; // Masquez le texte par défaut
        text.style.fontSize = `${textsize}px`
        text.setAttribute("fill", 'white'); //
        return text
    },
    addAxes(width, height,svg,strokwidth,color,xtext,ytext,textsize) {
        let style = `stroke:${color};stroke-width:${strokwidth}`
        const axeV = this.drawline(0,0,0,-height*1.2,style)
        const axeH = this.drawline(0,0,width*1.2,0,style)
        
        svg.appendChild(this.addText(0,xtext,-height*1.25,textsize))
        svg.appendChild(this.addText(width*1.1,ytext,height*0.1,textsize))
        svg.appendChild(axeH);
        svg.appendChild(axeV);
    },
    convertDateToSeconds(dateString) {
        const date = new Date(dateString);
        const timestampInMilliseconds = date.getTime();
        const timestampInSeconds = Math.floor(timestampInMilliseconds /  1000);
        return timestampInSeconds;
    },
    createCircle(svgElement, cx, cy, r, fill,datetext,amounttext) {
        // Créer un élément circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx); // Coordonnée x du centre du cercle
        circle.setAttribute('cy', cy); // Coordonnée y du centre du cercle
        circle.setAttribute('r', r); // Rayon du cercle
        circle.setAttribute('fill', fill); // Couleur du cercle
        const d_text = this.addText(cx*0.95,datetext,cy-25,10)
        const a_text = this.addText(cx*0.95,amounttext,cy-15,10)
        d_text.style.display = 'none';
        a_text.style.display = 'none';
        circle.addEventListener("mouseover", () => {
            circle.style.fill = "red"
            circle.setAttribute('r', r*2); // Coordonnée x du centre du cercle
            d_text.style.display = 'block';
            a_text.style.display = 'block';
            
        })
        circle.addEventListener("mouseout", () => {
            circle.style.fill = fill
            circle.setAttribute('r', r); // Coordonnée x du centre du cercle
            d_text.style.display = 'none';
            a_text.style.display = 'none';
           
        })
        // Ajouter le cercle à l'élément SVG spécifié
        svgElement.appendChild(d_text)
        svgElement.appendChild(a_text)
        svgElement.appendChild(circle);
    }
}