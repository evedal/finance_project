export default {
    company: (segment_name, company_ticker) => {
        "use strict";
        if(!segment_name) return ("/");
        return company_ticker ? "/segment/"+segment_name : "/segment/"+segment_name+"/company/"+company_ticker;
    },
    companies: "/company"
}