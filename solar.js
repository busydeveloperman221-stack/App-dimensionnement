
// Récupération des éléments du formulaire et des sections
const formulaire = document.getElementById('formulaire-dimensionnement');
const profondeurInput = document.getElementById('profondeur');
const QInput = document.getElementById('Q');
const irradianceInput = document.getElementById('irradiance');
const hInput = document.getElementById('h');
const rhoPomInput = document.getElementById('rho_pom');
const resultatsDimensionnement = document.getElementById('resultats-dimensionnement');

const sectionDonnees = document.getElementById('section-donnees');
const sectionTaille = document.getElementById('section-taille');
const sectionconvert = document.getElementById('section-convert');

const btnDonnees = document.getElementById('btn-donnees');
const btnTaille = document.getElementById('btn-taille');
const btnconvert = document.getElementById('btn-convert');


const Ppinput = document.getElementById("Pp");
const Upinput = document.getElementById("Up");
const introduction = document.querySelector('.hide');
const apropos = document.getElementById('apropos'); 
const latitude=document.getElementById('latitude');






// Fonction pour calculer le dimensionnement
function dimensionnerPompageSolaire(profondeur, Q, Pp,Up, irradiance, h, rhoPom) {
    const CH = 2.725; // Constante hydraulique
    const K = 0.65; // Coefficient correcteur
    
    // Calcul de la hauteur manométrique totale (HMT)
    const HMT =   1.1 * profondeur; // Ajoutez la perte de charge (Pc) à la profondeur

    // Calcul de l'énergie consommée par la pompe (Ec)
    const Ec = CH * Q * HMT / (rhoPom / 100); // Rendement de la pompe

    // Calcul de l'énergie photovoltaïque nécessaire (Epv)
    const Epv = Ec / K; // Énergie requise pour le pompage

    // Calcul de la puissance crête des panneaux (Pwc)
    const Pwc = Epv / irradiance; // Utilisez l'irradiance fournie
// if la puissance crete est comprise entre ces interval de nombre alors 


let Ts;
if (Pwc >= 0 && Pwc <= 500) {
    Ts = 12;
} else if (Pwc > 500 && Pwc <= 2000) {
    Ts = 24;
} else if (Pwc > 2000) {
    Ts = 48;
}


    // Calcul du nombre de panneaux (N)
   
    const N = Pwc / Pp;

         // Calcul du nombre de panneaux par série (Np)
    const Ns = Ts / Up;

    // Calcul du nombre de panneaux en parallele (Np)
    const Np = N / Ns;

    // Calcul du débit horaire de la pompe (d)
    const d = Q / h;

    // Calcul de la puissance électrique de la pompe (Ppom)
    const Ppom = CH * d * HMT / (rhoPom / 100); // Rendement de la pompe

    // Calcul de la puissance de l'onduleur (Pond)
    const Pond = 3 * Ppom;

 

    // Affichage des résultats
    resultatsDimensionnement.innerHTML = `
  
       <table style="border-collapse: collapse;border: 1px solid #ddd; padding: 8px;">
        <tr>
       <thead style="border-collapse: collapse;border: 1px solid #ddd; padding: 8px;">
       <th>Concepts</th> <td>Valeures Trouvées</td>
       </thead>
        </tr>
       <tr>
       <th> <p>Hauteur manométrique totale (HMT) :&nbsp;</p></th><td>&nbsp; ${HMT.toFixed(2)} m</td>
       </tr>
       <tr>
       <th>   <p>Énergie consommée par la pompe (Ec) :&nbsp;</p> </th><td>&nbsp; ${Ec.toFixed(2)} kWh</td>
       </tr>
         <tr>
       <th> <p>Énergie photovoltaïque nécessaire (Epv) :&nbsp;</p> </th><td>&nbsp; ${Epv.toFixed(2)} KWh</td>
       </tr>
         <tr>
       <th> <p>Puissance crête des panneaux (Pwc) :&nbsp;</p> </th><td>&nbsp; ${Pwc.toFixed(2)} Wc</td>
       </tr>
         <tr>
       <th><p>Nombre de panneaux Total (N) :&nbsp;&nbsp; ${N.toFixed(2)}&nbsp; soit </p> <td>&nbsp; &nbsp; ${Math.ceil(N)}&nbsp; &nbsp;</td>
</th>
       </tr>
        <tr>
       <Son formule d'usine de gagnant, mais pourquoi pas me convertir ? Regarder. th><p>Nombre de panneaux en séries (Ns) :&nbsp;</p> </th> <td> &nbsp; ${Math.ceil(Ns)}</td>
       </tr>
          <tr>
       <th><p>Nombre de panneaux en paralleles (Np) :&nbsp;</p> </th><td>&nbsp; ${Math.ceil(Np)}</td>
       </tr>
          <tr>
       <th>    <p>Débit horaire de la pompe (d) :&nbsp;</p> </th> <td>&nbsp; ${d.toFixed(2)} m³/h</td>
       </tr>
          <tr>
       <th> <p>Puissance électrique de la pompe (Ppom) :&nbsp;</p></th><td>&nbsp; ${Ppom.toFixed(2)} W</td>
       </tr>
            <tr>
       <th> <p>Puissance du Contrôleur (Pond) :&nbsp;</p> </th><td>&nbsp; ${Pond.toFixed(2)} W</td>
       </tr>
            <tr>
       <th> </th>
       </tr>
            <tr>
       <th> <p> Inclinaison optimale : &nbsp;  </p> </th><td>&nbsp; ${ latitude.value}°</td>
       </tr>
      
                
     </table> 
    `;
  
    // Conclusion
 resultatsDimensionnement.innerHTML+=`


 <fieldset>
<legend>  Conclusion</legend>
<p >Pour un Forage d'une quantité d'Eau de &nbsp; ${Q} m³/jour &nbsp;
  et une profondeur de &nbsp;${profondeur} m, &nbsp;il est recommandé d'utiliser une pompe qui a une puissance d'au moins &nbsp; ${Ppom.toFixed(2)} W &nbsp;
 avec un débit max de  &nbsp;${Math.ceil(d)} m³/h .&nbsp; Vous aurez besoin d'environ  &nbsp;${Math.ceil(N)}&nbsp; panneaux solaires de &nbsp; ${Pp} W &nbsp;
chacun, connectés en série et en parallèle selon les besoins. Un controleur d'au moins ${Math.ceil(Pond)} W  sera nécessaire.</p>

</fieldset>



 `;
 
}


// Fonction pour calculer les degrés d'inclinaison et d'optimisation d'un support panneau
// function calculerInclinaisonOptimale(latitude) {
//     // Inclinaison optimale en fonction de la latitude
//     const inclinaison = latitude * 0.76 + 3.1;
//     return inclinaison.toFixed(2);
// }

// // Exemple d'utilisation de la fonction
// const latitudeInput = document.getElementById('latitude');
// const inclinaisonResult = document.getElementById('inclinaison-result');

// latitudeInput.addEventListener('input', () => {
//     const latitude = parseFloat(latitudeInput.value);
//     if (!isNaN(latitude)) {
//         const inclinaison = calculerInclinaisonOptimale(latitude);
//         inclinaisonResult.textContent = `Inclinaison optimale : ${inclinaison}°`;
//     } else {
//         inclinaisonResult.textContent = "Veuillez entrer une latitude valide.";
//     }
// });

// Fonction pour calculer le dimensionnement des batteries
function dimensionnerBatteries(Ec, n, Ts, beta, sigmaBat, sigmaOnd) {
    const Ct = (Ec * n) / (Ts * beta * sigmaBat * sigmaOnd);
    return Ct;
}


const includeBatteriesSelect = document.getElementById('includeBatteries');
const batteryParams = document.getElementById('batteryParams');
const batteryParams2 = document.getElementById('batteryParams2');
const batteryParams3 = document.getElementById('batteryParams3');
const batteryParams4 = document.getElementById('batteryParams4');
const batteryParams5 = document.getElementById('batteryParams5');

includeBatteriesSelect.addEventListener('change', () => {
    if (includeBatteriesSelect.value === 'oui') {
        batteryParams.classList.remove('hidden');
        batteryParams2.classList.remove('hidden');
        batteryParams3.classList.remove('hidden');
        batteryParams4.classList.remove('hidden');
        batteryParams5.classList.remove('hidden');
    } else {
        batteryParams.classList.add('hidden');
        batteryParams2.classList.add('hidden');
        batteryParams3.classList.add('hidden');
        batteryParams4.classList.add('hidden');
        batteryParams5.classList.add('hidden');
    }
});

// Gestion de la soumission du formulaire
formulaire.addEventListener('submit', (event) => {
    event.preventDefault();
 
    const profondeur = parseFloat(profondeurInput.value);
    const Q = parseFloat(QInput.value);
    const irradiance = parseFloat(irradianceInput.value);
    const h = parseFloat(hInput.value);
    const rhoPom = parseFloat(rhoPomInput.value);
    const Pp = parseFloat(Ppinput.value);
    const Up = parseFloat(Upinput.value);
    dimensionnerPompageSolaire(profondeur, Q, Pp, Up, irradiance, h, rhoPom);
    sectionTaille.classList.remove('hidden');
    sectionDonnees.classList.add('hidden');
    sectionconvert.classList.add('hidden');
    section_principal.style.display='none';
    resultatsDimensionnement.classList.remove('hidden');
    resultatsDimensionnement.style.color="bisque";
    btncontain.style.visibility='hidden';
    sectionTaille.classList.add('resu');

    if (includeBatteriesSelect.value === 'oui') {
        const sigmaBat = parseFloat(document.getElementById('sigmaBat').value);
        const sigmaOnd = parseFloat(document.getElementById('sigmaOnd').value);
        const beta = parseFloat(document.getElementById('beta').value);
        const n = parseFloat(document.getElementById('n').value);
        const Ts = parseFloat(document.getElementById('Ts').value);
        
        const Ct = dimensionnerBatteries(Ec, n, Ts, beta, sigmaBat, sigmaOnd);
        
        resultatsDimensionnement.innerHTML += `
            <tr>
                <th>Capacité totale des batteries (Ct) :&nbsp;</th><td>&nbsp; ${Ct.toFixed(2)} Ah</td>
            </tr>
        `;
    }

});

let main=document.querySelector('.main');
let dim=document.getElementById('dim');
let Iddevis=document.getElementById('Iddevis');
let printdevis=document.getElementById('printdevis');
let labell=document.getElementById('labell');
let nsolaire=document.getElementById('nsolaire');
let nirrig=document.getElementById('nirrig');
let pdf=document.getElementById('pdf');
window.addEventListener('DOMContentLoaded',()=>{
    documentation.classList.add('documents');
    Iddevis.classList.add('devis');
    sectionTaille.classList.add('hidden');
  
});
let mainsection = document.querySelector('.mainsection');
let printBtn = document.getElementById('printBtn');
let mainheade = document.querySelector('.mainheade')
let btncontain=document.querySelector('.button-container');
let h1 = document.querySelector('.h1');
let navid = document.getElementById('navid');
// let fermbtn2=document.getElementById('fermbtn2');

// let navidd = document.querySelector('navidd');
let section_principal = document.getElementById('section_principal');
printBtn.addEventListener('click',()=>{
    section_principal.style.display='none';
    sectionTaille.classList.remove('resu');
    // resultatsDimensionnement.style.color="white";
    resultatsDimensionnement.style.fontFamily="'Times New Roman',  serif";
    resultatsDimensionnement.style.fontSize='12';
    resultatsDimensionnement.style.color="initial";
    
    window.print();
    h1.style.visibility='hidden';
    navid.classList.add('navIdd');
   

});
// let sectionirrigation=document.getElementById('section-irrigation');
nirrig.addEventListener('click',function(){
    navid.classList.remove('navId');
    section_principal.style.visibility='hidden';
    mainsection.classList.remove('mainsection');
    sectionirrigation.classList.remove('hidden');
    // btncontain.style.visibility='hidden';
  
   
    
});

nsolaire.addEventListener('click',function (){
    navid.classList.remove('navId');
    mainsection.classList.remove('mainsection');
    section_principal.style.display='none';
    btncontain.style.visibility='hidden';
    // menuprincipal.style.visibility='visible';
});
retour.addEventListener('click',()=>{
    navid.classList.add('navId');
    mainsection.classList.add('mainsection');
    section_principal.style.display='visible';
});
printdevis.addEventListener('click',()=>{
    introduction.classList.add('hide');
   
    Iddevis.classList.remove('devis');
    documentation.classList.add('documents');
    sectionTaille.classList.add('hidden');
    sectionDonnees.classList.add('hidden');
    sectionconvert.classList.add('hidden');
    resultatsDimensionnement.classList.add('hidden');
    btncontain.style.visibility='hidden';
    labell.classList.add('bouton');
    navid.classList.add('navIdd');
  
});




pdf.addEventListener('click',()=>{
    documentation.classList.remove('documents');
    introduction.classList.add('hide');
    mainheade.style.display='block';
    Iddevis.classList.add('devis');
    btncontain.style.visibility='hidden';
    sectionTaille.classList.add('hidden');
    sectionDonnees.classList.add('hidden');
    sectionconvert.classList.add('hidden');
    resultatsDimensionnement.classList.add('hidden');

    labell.classList.add('bouton');
    main.classList.remove('mainzindex');
    navid.classList.add('navIdd');
    btncontain.style.visibility='hidden';
});
apropos.addEventListener('click',()=>{
    introduction.classList.remove('hide');
    mainheade.style.display='block';
    Iddevis.classList.add('devis');
    btncontain.style.visibility='hidden';
    sectionTaille.classList.add('hidden');
    sectionDonnees.classList.add('hidden');
    sectionconvert.classList.add('hidden');
    resultatsDimensionnement.classList.add('hidden');
    documentation.classList.add('documents');
    labell.classList.add('bouton');
    navid.classList.add('navIdd');
    btncontain.style.visibility='hidden';
    // suppt.classList.add('cache');
});

dim.addEventListener('click',function(){
    sectionTaille.classList.add('hidden');
    sectionconvert.classList.add('hidden');
    mainheade.style.display='block';
    introduction.classList.add('hide');
    btncontain.style.visibility='visible';
    Iddevis.classList.add('devis');
    documentation.classList.add('documents');
    labell.classList.remove('bouton');
    navid.classList.add('navIdd');
  
  
});
let couleur=document.getElementById('couleur');
let btn1=document.getElementById('btn1');
let btn2=document.getElementById('btn2');
let btn3=document.getElementById('btn3');
let btn4=document.getElementById('btn4');
let btn5=document.getElementById('btn5');

couleur.addEventListener('input',()=>{
   
    document.body.style.background = couleur.value;
    btn1.style.background=couleur.value;
    btn2.style.background=couleur.value;
    btn3.style.background=couleur.value;
    btn4.style.background=couleur.value;
    btn5.style.background=couleur.value;
    btncontain.style.visibility='hidden';
 });
 
// Gestion des boutons pour changer de section
btnDonnees.addEventListener('click', () => {
    sectionDonnees.classList.remove('hidden');
    sectionTaille.classList.add('hidden');
    sectionconvert.classList.add('hidden');
    btnDonnees.style.background="red";
    btnDonnees.textContent="2click/OF";
    btnDonnees.style.color="white";
    introduction.classList.add('hide');
    Iddevis.classList.add('devis');
    // navid.classList.add('navIdd');
document.documentElement.scrollTop='520';
//   mainzindex.style.visibility='visible';
    navid.classList.add('navIdd');
    documentation.classList.add('documents');
});
// Gestion des boutons pour changer de section
btnconvert.addEventListener('click', () => {
    sectionconvert.classList.remove('hidden');
    sectionDonnees.classList.add('hidden');
    sectionTaille.classList.add('hidden');
    btnconvert.style.background="red";
    btnconvert.textContent="2click/OF";
    btnconvert.style.color="white";
    introduction.classList.add('hide');
    // suppt.classList.add('cache');
    resultatsDimensionnement.scrollTop = 180;
    Iddevis.classList.add('devis');
  
});
btnconvert.addEventListener('click', function(){
    value.focus();
  
});
// let supportt=document.getElementById('supportt');






btnTaille.addEventListener('click', () => {
    sectionDonnees.classList.add('hidden');
    sectionTaille.classList.remove('hidden');
    sectionconvert.classList.add('hidden');
    btnTaille.style.background="red";
    btnTaille.textContent="2click/OF";
    btnTaille.style.color="white";
    introduction.classList.add('hide');
    // suppt.classList.add('hidden');
    Iddevis.classList.add('devis');
  
    // resultatsDimensionnement.scrollTop = 80;
});
const input=document.querySelector(".input");
btnDonnees.addEventListener('click', function(){
    input.focus();
});


// Gestion des boutons pour Fermer de section
btnconvert.addEventListener('dblclick', () => {
    sectionconvert.classList.add('hidden');
    btnconvert.style.background="green";
    btnconvert.textContent="1click/ON";
    btnconvert.style.color="white"; 
    Iddevis.classList.add('devis');
btnconvert.style.fontSize="12px"
resultatsDimensionnement.scrollTop = 280;
   
});
btnDonnees.addEventListener('dblclick', () => {
    sectionDonnees.classList.add('hidden');
    btnDonnees.style.background="green";
    btnDonnees.textContent="1click/ON";
    btnDonnees.style.color="white";
    Iddevis.classList.add('devis');
    btnDonnees.style.fontSize="12px"
 
   
});

btnTaille.addEventListener('dblclick', () => {
    sectionTaille.classList.add('hidden');
    btnTaille.style.background="green";
    btnTaille.textContent="1click/ON";
    btnTaille.style.color="white";
    btnTaille.style.fontSize="12px"
    // suppt.classList.add('cache');
});
resultatsDimensionnement.addEventListener('dblclick', () => {
    sectionTaille.classList.add('hidden');
    btnTaille.style.background="green";
    btnTaille.textContent="1click/ON";
    btnDonnees.style.background="green";
    btnDonnees.textContent="1click/ON";
    btnDonnees.style.color="white";
    // suppt.classList.add('cache');
});


// btnDonnees.style.background="green";
btnDonnees.textContent="1click/ON";
btnDonnees.style.color="white";
btnDonnees.style.fontSize="12px"
btnDonnees.style.textAlign="center";

btnconvert.textContent="1click/ON";
btnconvert.style.color="white";
btnconvert.style.fontSize="12px"
btnconvert.style.textAlign="center";

btnTaille.style.hover="transparent";
btnTaille.textContent="1click/ON";
btnTaille.style.color="white";
btnTaille.style.fontSize="12px"
btnTaille.style.textAlign="center";


// convertion

const valueInput = document.getElementById('value');
const unitSelect = document.getElementById('unit');
const resultDiv = document.getElementById('result');


// partie devis

function convertVolume() {
    const value = parseFloat(valueInput.value); 
    const unit = unitSelect.value;

    // Vérifier si la valeur est un nombre valide
    if (isNaN(value)) {
        resultDiv.innerText = "Veuillez entrer un nombre valide.";
        return;
    }

    let result;
    // Conversion selon l'unité choisie
    switch (unit) {
        case 'l':
            // 1 litre équivaut à 0.001 mètres cubes
            result = value * 0.001; 
            resultDiv.innerText = `${value} L = ${result} m³`;
            break;
        case 'm3':
            // Convertir mètres cubes en litres
            //    icon: __dirname + '\\images\\sensoli3.png'
            result = value * 1000; 
            resultDiv.innerText = `${value} m³ = ${result} L`;
            break;
        case 'ha':
            // Convertir hectares en mètres carrés
            result = value * 10000;
            resultDiv.innerText = `${value} ha = ${result} m²`;
            break;
        case 'm²':
            // Convertir mètres carrés en hectares
            result = value / 10000;
            resultDiv.innerText = `${value} m² = ${result} ha`;
            break;
        case 'mm³':
            // Convertir millimètres cubes en mètres cubes
            result = value * 0.000001;
            resultDiv.innerText = `${value} mm³ = ${result} m³`;
            break;
        default:
            resultDiv.innerText = "Unité non reconnue.";
            break;
    }
}

// Ajouter des écouteurs d'événements pour les changements d'entrée
valueInput.addEventListener('input', convertVolume);
unitSelect.addEventListener('change', convertVolume);

let d1=document.getElementById('d1');
let d2=document.getElementById('d2');
let d3=document.getElementById('d3');
let d4=document.getElementById('d4');
let d5=document.getElementById('d5');
let d6=document.getElementById('d6');





let ptotal1=document.getElementById('ptotal1');
let ptotal2=document.getElementById('ptotal2');
let ptotal3=document.getElementById('ptotal3');
let ptotal4=document.getElementById('ptotal4');
let ptotal5=document.getElementById('ptotal5');
let ptotal6=document.getElementById('ptotal6');
let ptotal7=document.getElementById('ptotal7');
// let Pu1=document.getElementById('Pu1');
let q1=document.getElementById('q1');
let q2=document.getElementById('q2');
let q3=document.getElementById('q3');
let q4=document.getElementById('q4');
let q5=document.getElementById('q5');
let q6=document.getElementById('q6');

let p1=document.getElementById('p1');
let p2=document.getElementById('p2');
let p3=document.getElementById('p3');
let p4=document.getElementById('p4');
let p5=document.getElementById('p5');
let p6=document.getElementById('p6');

let Q1=document.getElementById('Q1');
let Q2=document.getElementById('Q2');
let Q3=document.getElementById('Q3');
let Q4=document.getElementById('Q4');
let Q5=document.getElementById('Q5');
let Q6=document.getElementById('Q6');

let PU1=document.getElementById('PU1');
let PU2=document.getElementById('PU2');
let PU3=document.getElementById('PU3');
let PU4=document.getElementById('PU4');
let PU5=document.getElementById('PU5');
let PU6=document.getElementById('PU6');

let TTU1=document.getElementById('TTU1');
let TTU2=document.getElementById('TTU2');
let TTU3=document.getElementById('TTU3');
let TTU4=document.getElementById('TTU4');
let TTU5=document.getElementById('TTU5');
let TTU6=document.getElementById('TTU6');
let table1=document.getElementById('table1');
let table2=document.getElementById('table2');
let Tquantity=document.getElementById('Tquantity');
let TTprixU=document.getElementById('TTprixU');
let btnimprim=document.getElementById('btnimprim');
let datetime=document.getElementById('date-heure');
let dattime=document.getElementById('dattime');
let detail=document.getElementById('detail');

const textarea1 = document.getElementById('textarea1');
const textarea2 = document.getElementById('textarea2');
const textarea3 = document.getElementById('textarea3');
const textarea4 = document.getElementById('textarea4');
const textarea5 = document.getElementById('textarea5');
const textarea6 = document.getElementById('textarea6');


document.querySelectorAll('.area').forEach(paragraf =>{
    paragraf.addEventListener('input', heihtextarea);
})
function heihtextarea() {
    
    textarea1.style.height="auto";
    textarea1.style.height=`${textarea1.scrollHeight}px`;
    textarea3.style.height="auto";
    textarea3.style.height=`${textarea3.scrollHeight}px`;
    textarea2.style.height="auto";
    textarea2.style.height=`${textarea2.scrollHeight}px`;

textarea4.style.height="auto";
textarea4.style.height=`${textarea4.scrollHeight}px`;
textarea5.style.height="auto";
textarea5.style.height=`${textarea5.scrollHeight}px`;
textarea6.style.height="auto";
textarea6.style.height=`${textarea6.scrollHeight}px`;
}

window.addEventListener('DOMContentLoaded',()=>{
    table2.style.display='none';
    table1.style.display='block';
   labell.classList.remove('bouton');

});

btnimprim.addEventListener('click',()=>{
    table2.style.display='block';
    table1.style.display='none';
    table2.style.fontFamily='Times New Roman, Times,sans-serif';
    table2.style.fontSize='12';
    table2.style.textAlign='left'
    mainheade.classList.add('hide');
    // section_principal.style.display='none';
    detail.style.visibility='hidden';
    window.print();
    // section_principal.style.display='none';
if(btnimprim){
    section_principal.style.display='none';
 
    table1.style.display='block';
    mainheade.style.display='none';
    table2.style.display='none';
   
    sectionTaille.classList.add('hidden');
    sectionDonnees.classList.add('hidden');
    sectionconvert.classList.add('hidden');
    resultatsDimensionnement.classList.add('hidden');
}
});

textarea1.addEventListener('change',()=>{
    d1.textContent=textarea1.value;
});
textarea2.addEventListener('change',()=>{
    d2.textContent=textarea2.value;
});
textarea3.addEventListener('change',()=>{
    d3.textContent=textarea3.value;
});
textarea4.addEventListener('change',()=>{
    d4.textContent=textarea4.value;
});
textarea5.addEventListener('change',()=>{
    d5.textContent=textarea5.value;
});
textarea6.addEventListener('change',()=>{
    d6.textContent=textarea6.value;
});



q1.addEventListener('input',()=>{
    // ptotal1.textContent=q1.value*p1.value;
    Q1.textContent=q1.value;
    Tquantity.textContent=totalQuantites.textContent;
});
q2.addEventListener('input',()=>{
    ptotal2.textContent=q2.value*p2.value;
    Q2.textContent=q2.value;
    Tquantity.textContent=totalQuantites.textContent;
});
q3.addEventListener('input',()=>{
    ptotal3.textContent=q3.value*p3.value;
    Q3.textContent=q3.value;
    Tquantity.textContent==totalQuantites.textContent;
});
q4.addEventListener('input',()=>{
    ptotal4.textContent=q4.value*p4.value;
    Q4.textContent=q4.value;
    Tquantity.textContent=totalQuantites.textContent;

});
q5.addEventListener('input',()=>{
    ptotal5.textContent=q5.value*p5.value;
    Q5.textContent=q5.value;
    Tquantity.textContent=totalQuantites.textContent;
});
q6.addEventListener('input',()=>{
    ptotal6.textContent=q6.value*p6.value;
    Q6.textContent=q6.value;
    Tquantity.textContent=totalQuantites.textContent;
});


p1.addEventListener('input',()=>{
    ptotal1.textContent=q1.value*p1.value;
    TTU1.textContent=ptotal1.textContent;
    PU1.textContent=p1.value;
  
  

});
p2.addEventListener('input',()=>{
    ptotal2.textContent=q2.value*p2.value;
    TTU2.textContent=ptotal2.textContent;
    PU2.textContent=p2.value;

});
p3.addEventListener('input',()=>{
    ptotal3.textContent=q3.value*p3.value;
    TTU3.textContent=ptotal3.textContent;
    PU3.textContent=p3.value;
  
});
p4.addEventListener('input',()=>{
    ptotal4.textContent=q4.value*p4.value;
    TTU4.textContent=ptotal4.textContent;
    PU4.textContent=p4.value;

});
p5.addEventListener('input',()=>{
    ptotal5.textContent=q5.value*p5.value;
    TTU5.textContent=ptotal5.textContent;
    PU5.textContent=p5.value;
  
});
p6.addEventListener('input',()=>{
 
    ptotal6.textContent=q6.value*p6.value;
    TTU6.textContent=ptotal6.textContent;
    PU6.textContent=p6.value;
    Prixmain.textContent=PrixTTc.textContent;
});
dattime.addEventListener('change',()=>{
    datetime.textContent = dattime.value;
});
   
document.querySelectorAll('.quantity, .price ').forEach(input => {
    input.addEventListener('input', calculerTotaux);
    
});
document.querySelectorAll('.Punitaire ').forEach(input => {
    input.addEventListener('input', calculer);
    
});

function calculer() {
    let ptotal1 = 0;
    document.querySelectorAll('.Punitaire').forEach(input => {
        ptotal1 += Number(input.value) * Number(Punitaire.value) || 0;
    });
 
    document.getElementById('ptotal1').textContent = ptotal1; 
}


function calculerTotaux() {
    let totalQuantites = 0; // Initialiser la somme des quantités
    let totalPrix = 0; // Initialiser la somme des prix
   let TprixU = 0;
   let Tquantity = 0;
   let Prixmain = 0;
   let Prixmain2 = 0;
   let ptotal7 = 0;
   let Prixmain3 = 0;

    // Calculer la somme des quantités
    document.querySelectorAll('.quantity , .ddd').forEach(input => {
        totalQuantites += Number(input.value) || 0; // Ajouter la valeur de chaque input à la somme
        Tquantity += Number(input.value) || 0;
   
       
    });
   
    // Calculer la somme des prix
    document.querySelectorAll('.price ,.ddd').forEach(input => {
        totalPrix += Number(input.value) || 0; // Ajouter la valeur de chaque input à la somme
        TprixU += Number(input.value) || 0;
     Prixmain += Number(input.value)*25/100 || 0;
     Prixmain2 += Number(input.value)*25/100 || 0;
     ptotal7 += Number(input.value)*25/100 || 0;
     Prixmain3 += Number(input.value)*25/100 || 0;
    
  
        
    });
    

  
    // Mettre à jour le contenu des spans avec les totaux calculés
    document.getElementById('totalQuantites').textContent = totalQuantites;
    document.getElementById('Tquantity').textContent = Tquantity;
    document.getElementById('totalPrix').textContent = totalPrix; 
    document.getElementById('TprixU').textContent = TprixU; 
    document.getElementById('Prixmain').textContent = Prixmain; 
    document.getElementById('Prixmain2').textContent = Prixmain2; 
    document.getElementById('ptotal7').textContent = ptotal7;
    document.getElementById('Prixmain3').textContent = Prixmain3;
  


}


 p1.addEventListener('input',()=>{
    PrixTTc.textContent=parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent)+parseFloat(ptotal4.textContent)+parseFloat(ptotal5.textContent)+parseFloat(ptotal6.textContent)+parseFloat(ptotal7.textContent);
    TTprixU.textContent=parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent)+parseFloat(ptotal4.textContent)+parseFloat(ptotal5.textContent)+parseFloat(ptotal6.textContent)+parseFloat(ptotal7.textContent);
// TprixU.textContent=parseFloat(p1.value)+parseFloat(p2.value)+parseFloat(p3.value)+parseFloat(p4.value)+parseFloat(p5.value)+parseFloat(p6.value)+parseFloat(p7.value);
  
    if (p1.value=="") {
    PrixTTc.textContent=="0";
}
});
p2.addEventListener('input',()=>{
    PrixTTc.textContent=parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent)+parseFloat(ptotal4.textContent)+parseFloat(ptotal5.textContent)+parseFloat(ptotal6.textContent)+parseFloat(ptotal7.textContent);
    TTprixU.textContent=parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent)+parseFloat(ptotal4.textContent)+parseFloat(ptotal5.textContent)+parseFloat(ptotal6.textContent)+parseFloat(ptotal7.textContent);
    // TprixU.textContent=parseFloat(p1.value)+parseFloat(p2.value)+parseFloat(p3.value)+parseFloat(p4.value)+parseFloat(p5.value)+parseFloat(p6.value)+parseFloat(p7.value);
    if (p2.value=="") {
    PrixTTc.textContent==parseFloat(ptotal1.textContent);
}
});
p3.addEventListener('input',()=>{
    PrixTTc.textContent=parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent)+parseFloat(ptotal4.textContent)+parseFloat(ptotal5.textContent)+parseFloat(ptotal6.textContent)+parseFloat(ptotal7.textContent);
    TTprixU.textContent=parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent)+parseFloat(ptotal4.textContent)+parseFloat(ptotal5.textContent)+parseFloat(ptotal6.textContent)+parseFloat(ptotal7.textContent);
    // TprixU.textContent=parseFloat(p1.value)+parseFloat(p2.value)+parseFloat(p3.value)+parseFloat(p4.value)+parseFloat(p5.value)+parseFloat(p6.value)+parseFloat(p7.value);
    if (p3.value=="") {
    PrixTTc.textContent==parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent);
}
});
p4.addEventListener('input',()=>{
    PrixTTc.textContent=parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent)+parseFloat(ptotal4.textContent)+parseFloat(ptotal5.textContent)+parseFloat(ptotal6.textContent)+parseFloat(ptotal7.textContent);
    TTprixU.textContent=parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent)+parseFloat(ptotal4.textContent)+parseFloat(ptotal5.textContent)+parseFloat(ptotal6.textContent)+parseFloat(ptotal7.textContent);
    // TprixU.textContent=parseFloat(p1.value)+parseFloat(p2.value)+parseFloat(p3.value)+parseFloat(p4.value)+parseFloat(p5.value)+parseFloat(p6.value)+parseFloat(p7.value);
    if (p4.value=="") {
        PrixTTc.textContent==parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent);
    }
});
p5.addEventListener('input',()=>{
    PrixTTc.textContent=parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent)+parseFloat(ptotal4.textContent)+parseFloat(ptotal5.textContent)+parseFloat(ptotal6.textContent)+parseFloat(ptotal7.textContent);
    TTprixU.textContent=parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent)+parseFloat(ptotal4.textContent)+parseFloat(ptotal5.textContent)+parseFloat(ptotal6.textContent)+parseFloat(ptotal7.textContent);
    // TprixU.textContent=parseFloat(p1.value)+parseFloat(p2.value)+parseFloat(p3.value)+parseFloat(p4.value)+parseFloat(p5.value)+parseFloat(p6.value)+parseFloat(p7.value);
    if (p5.value=="") {
        PrixTTc.textContent==parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent)+parseFloat(ptotal4.textContent);
    }
});
p6.addEventListener('input',()=>{
    PrixTTc.textContent=parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent)+parseFloat(ptotal4.textContent)+parseFloat(ptotal5.textContent)+parseFloat(ptotal6.textContent)+parseFloat(ptotal7.textContent);
    TTprixU.textContent=parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent)+parseFloat(ptotal4.textContent)+parseFloat(ptotal5.textContent)+parseFloat(ptotal6.textContent)+parseFloat(ptotal7.textContent);
        if (p6.value=="") {
        PrixTTc.textContent==parseFloat(ptotal1.textContent)+parseFloat(ptotal2.textContent)+parseFloat(ptotal3.textContent)+parseFloat(ptotal4.textContent)+parseFloat(ptotal5.textContent);
    }
});



// formule dimensionnement Irrigation




