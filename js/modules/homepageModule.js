import { help } from "./help.js"
import { graphqlQuery } from "./query.js"
import { drawGraphics } from "./drawGraphics.js"
import { getDatas } from "./getdatas.js"

const graphqlUrl = 'https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql'

export const homepageModule = {
        init () {
            this.getData(help.getToken())
            this.setupEventlistenner()
        },
        setupEventlistenner(){
            const logoutButton = document.querySelector(".logout")
            logoutButton.addEventListener("click", () => {
              help.deleteToken();
              window.location.pathname = "/"
              logoutButton.style.display = "none"
            })
        },
        getData(jwtToken) {
            console.log("get data: " + JSON.stringify(jwtToken))
            fetch(graphqlUrl, {
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                  query: graphqlQuery,
                  variables:{objectName: "graphql"}
                }),
            })
            .then(graphqlResponse => {
                graphqlResponse.json()
                .then(data => {
                  // let login = data.data.user[0].login
                  // console.log("data:",login);
                  // const skills = document.querySelector(".skills");
                  // console.log("audits:",skills)
                  console.log("profil:", data)
              // Skill graphe
                    const skillsDatas = getDatas.skillsdata(data.data)
                    const svg = drawGraphics.drawBarreGraphic2(skillsDatas,60,5,1,"red")
                    console.log("svg:",svg)
                    document.querySelector(".skills").appendChild(svg)
              // Info tables
                    const infosDatas =  getDatas.infosdata(data.data)
                    console.log("infos:",infosDatas)
                    const table = drawGraphics.createTableFromData(infosDatas)
                    document.querySelector(".userinfos").appendChild(table)
              // Xp 
                    const xpval = getDatas.xpval(data.data)
                    // const xpBox = drawGraphics.createxpbox(xpval)
                    document.querySelector(".xps").textContent = `${xpval} kB`
              // Audit Graphs
                    const auditGraphsDatas = getDatas.auditdata(data.data)
                    drawGraphics.creatauditbox(auditGraphsDatas)
                    // document.querySelector(".audits").appendChild(auditBox) 
              // Audit Progress skill 
                    const xpProgressData = getDatas.xpprogessdata(data.data)
                    console.log("xpProgressData", xpProgressData)
                    const xpsvg =  drawGraphics.drawLinerGraphic(xpProgressData,600, 400,1,"red")
                    document.querySelector(".progress").appendChild(xpsvg)
                  
                })
            })
        },                   
}