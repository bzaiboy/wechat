/*
 X Timeline Cleaner
 Loon Script

*/


let body = $response.body;


if (!body) {
    $done({});
}


try {


    let json = JSON.parse(body);



    const removeKeys = [

        // 广告
        "promoted_metadata",
        "advertiser_results",
        "promoted",

        // 推荐关注
        "who_to_follow",
        "follow_recommendations",

        // 推荐模块
        "module_entry",
        "suggest_pyle",

        // 趋势
        "trends",

    ];




    function clean(obj){


        if(!obj || typeof obj !== "object"){
            return;
        }



        if(Array.isArray(obj)){


            for(let i=obj.length-1;i>=0;i--){


                let item=obj[i];


                let text="";


                try{

                    text=JSON.stringify(item);

                }catch(e){}



                if(

                    text.includes("promoted_metadata") ||

                    text.includes("\"promoted\":true") ||

                    text.includes("advertiser_results")

                ){

                    obj.splice(i,1);

                    continue;

                }


                clean(item);

            }


        }

        else{


            for(let key in obj){


                if(removeKeys.includes(key)){


                    delete obj[key];

                    continue;

                }


                clean(obj[key]);

            }

        }


    }



    clean(json);



    $done({

        body:JSON.stringify(json)

    });



}

catch(e){


    $done({});

}
