let player;
player = 4;

const hands = new Array(player);
const community = new Array(5);

shuffle();
console.log(community);
console.log(hands);

function shuffle() {
    let random;
    let flag;
    const randoms = new Array(player * 2 + 5);
    for (i = 0; i < player * 2 + 5; i++) {
        flag = 1;
        random = Math.floor(Math.random() * 52);
        for (j = 0; j < i; j++) {
            if (random === randoms[j]) {
                i--;
                flag = 0;
                break;
            }
        }
        if (flag) randoms[i] = random;
    }
    for (i = 0; i < 5; i++) {
        community[i] = {sort: ~~(randoms[i] / 13), rank: randoms[i] % 13 + 1};
    }
    for (i = 0; i < player; i++) {
        hands[i] = [
            {sort: ~~(randoms[i*2 + 5] / 13), rank: randoms[i*2 + 5] % 13 + 1},
            {sort: ~~(randoms[i*2 + 6] / 13), rank: randoms[i*2 + 6] % 13 + 1}
        ];
    }
};
let mark=[[],[],[],[],[],[],[],[],[],[],[]];
let num=[[],[],[],[],[],[],[],[],[],[],[]];
for (let i=0;i<player;i++){
    for (let j=0;j<5;j++){
        mark[i][2+j]=community[j].sort;
        num[i][2+j]=community[j].rank;
    }
};
for (let i=0;i<player;i++){
    for (let j=0;j<2;j++){
        mark[i][j]=hands[i][j].sort;
        num[i][j]=hands[i][j].rank;
    }
};

const four=(num)=>{
    const numbers = [41,2,3,5,7,11,13,17,19,23,29,31,37];
    for (let i=numbers.length-1;i>-1;i--){
        if (num%(numbers[i]**4)===0){
            return [true,numbers[i]];
        }
    }
    return false;
};
const full=(num)=>{
    const numbers = [41,2,3,5,7,11,13,17,19,23,29,31,37];
    for (let i=numbers.length-1;i>-1;i--){
        if (num%(numbers[i]**3)===0){
            num/=(numbers[i]**3);
            for (let j=numbers.length-1;j>-1;j--){
                if (num%(numbers[j]**2)===0){
                    return [true,numbers[i]];
                }
            }
        }
    }
    return false;
};
const three=(num)=>{
    const numbers = [41,2,3,5,7,11,13,17,19,23,29,31,37,41];
    for (let i=numbers.length-1;i>-1;i--){
        if (num%(numbers[i]**3)===0){
            return [true,numbers[i]];
        }
    }    
    return false;
};
const pair=(num)=>{
    const numbers = [41,2,3,5,7,11,13,17,19,23,29,31,37];
    for (let i=numbers.length-1;i>-1;i--){
        if (num%(numbers[i]**2)===0){
            num/=(numbers[i]**2);
            for (let j=numbers.length-1;j>-1;j--){
                if (num%(numbers[j]**2)===0){ 
                    return [true,numbers[i]];
                }

            }
              
        }
    }
    return false;
};
const onepair=(num)=>{
    const numbers = [41,2,3,5,7,11,13,17,19,23,29,31,37];
    for (let i=numbers.length-1;i>-1;i--){
        if (num%(numbers[i]**2)===0){  
            return [true,numbers[i]];
        }
    }
    return false;
};
const st=(num)=>{
    const numbers = [41,2,3,5,7,11,13,17,19,23,29,31,37,41];
    let straight = [];
    for (let i=0;i<numbers.length-4;i++) {
        k=(numbers[i] * numbers[i+1] * numbers[i+2] * numbers[i+3] * numbers[i+4]); 
        straight.push(k);
    }
    for (let i=numbers.length-5;i>-1;i--){
        if (num%straight[i]===0){
            return [true,numbers[i]];           
        }
    }
    return false;
};
const fl=(ma)=>{
    const mark = [2,3,5,7];
    for (let i=0;i<mark.length;i++){
        if (ma % mark[i]**5==0){
            return [true,2];
        }
    }
    return false;
};
const stfl=(numbers,mark,ma,num)=>{
    const marks = [2,3,5,7];
    let flmark=0;
    
    for (let i=0;i<marks.length;i++){
        if (ma % marks[i]**5==0){
            flmark=marks[i];
            for (let j=0;j<mark.length;j++){
                if (flmark!=mark[j]){
                    num/=numbers[j];
                }
            }
            if (st(num)[0]){
                return [true,st(num)[1]];
            }
        }
    }
    return false;
};
const ro=(num)=>{
    if (num%(41*37*31*29*23)===0){
        return [true,41];
    }
    return false;
};


const judge=(r,mark)=>{
    const t = [,41,2,3,5,7,11,13,17,19,23,29,31,37];
    const q = [2,3,5,7];
    const n=t[r[0]]*t[r[1]]*t[r[2]]*t[r[3]]*t[r[4]]*t[r[5]]*t[r[6]];
    const m=q[mark[0]]*q[mark[1]]*q[mark[2]]*q[mark[3]]*q[mark[4]]*q[mark[5]]*q[mark[6]];
    const numbers=[];
    for (let i=0;i<r.length;i++){
        numbers[i]=t[r[i]];
    };
    if (stfl(numbers,mark,m,n)[0]){
        if (ro(n)[0]){
            return [9,ro(n)[1]];
        }else{
            return [8,stfl(numbers,mark,m,n)[1]];
        }        
    }else if(four(n)[0]){
        return [7,four(n)[1]];
    }else if (full(n)[0]){
        return [6,full(n)[1]];
    }else if(fl(m)[0]){
        return [5,fl(m)[1]];            
    }else if (st(n)[0]){
        return [4,st(n)[1]];
    }else if (three(n)[0]){
        return [3,three(n)[1]];
    }else if (pair(n)[0]){
        return [2,pair(n)[1]];
    }else if (onepair(n)[0]){
        return [1,onepair(n)[1]];
    }else{
        return [0,2];
    }
};
const s=2;
const h=3;
const d=5;
const c=7;
const result=[];
let overlap=[];
let count=0;
for (let i=0;i<num.length;i++){
    result[i]=judge(num[i],mark[i])[0];
};
const max = Math.max.apply(null,result);
for (let i=0;i<player;i++){
    if (result[i]===max){
        overlap.push(i);
        count+=1
    }
};
let secondresult=[];
let secondoverlap=[];
let secondcount=0;
let finalresult=[[],[],[],[],[],[],[],[],[],[]];
let finalmax=[];
let finalmaxresult=0;
let finalcount=0;
let finaloverlap=[];
let finalmin=[];
let finalminresult=0;
let finalmincount=0;
let finalminoverlap=[];
if (count>1){
    for (let i=0;i<overlap.length;i++){
        secondresult[i]=judge(num[overlap[i]],mark[overlap[i]])[1];
    }
    const secondmax=Math.max.apply(null,secondresult);
    for (let i=0;i<overlap.length;i++){
        if (secondresult[i]===secondmax){
            secondoverlap.push(overlap[i]);
            secondcount+=1;
        }
    }
    if (secondcount>1){
        for (let i=0;i<secondoverlap.length;i++){
            for (let j=0;j<2;j++){
                finalresult[i][j]=num[overlap[i]][j];
            }
            console.log[i];
            finalmax[i]=Math.max.apply(null,finalresult[i]);
            finalmin[i]=Math.min.apply(null,finalresult[i]);
        }
        finalmaxresult=Math.max.apply(null,finalmax);
        for (let i=0;i<num.length;i++){
            if (finalmaxresult===finalmax[i]){
                finalcount+=1
                finaloverlap.push(i);
            }
        }
        if (finalcount>1){
            finalminresult=Math.max.apply(null,finalmin);
            for (let i=0;i<num.length;i++){
                if (finalminresult===finalmin[i]){
                    finalmincount+=1;
                    finalminoverlap.push(i);
                }
            }
            if (finalmincount>1){
                console.log('引き分け')
            }else{
                console.log('4:player:'+finalminoverlap[0]);
            }
        }else{
            console.log('3:player:'+finaloverlap[0]);
        }       
    }else{
        console.log('2:player:'+secondoverlap[0]);
    }
}else{
    console.log('1:player:'+overlap[0]);
};
console.log(max);
