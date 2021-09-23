import { fetchData } from "./citizenSearchResource/citizenFunctions";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import { checkValueForNA, convertEpochToDate } from "../utils";
const header = getCommonHeader(
  {
    labelName: "My Applications",
    labelKey: "TL_MY_APPLICATIONS_HEADER"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const screenConfig = {
  uiFramework: "material-ui",
  name: "my-applications",
  beforeInitScreen: (action, state, dispatch) => {
    fetchData(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applicationsCard: {
          uiFramework: "custom-molecules",
          componentPath: "SingleApplication",
          visible: true,
          props: {
            contents: [

              {
                label: "TL_COMMON_TABLE_COL_APP_NO",
                jsonPath: "applicationNumber"
              },

              {
                label: "TL_COMMON_TABLE_COL_STATUS",
                jsonPath: "status",
                prefix: "WF_NEWTL_"
              },
              {
                label: "MR_GROOM_NAME",
                jsonPath: "coupleDetails[1].firstName"
              },
              {
                label: "MR_BRIDE_NAME",
                jsonPath: "coupleDetails[0].firstName"
              }
            ],
            moduleName: "MR",
            screenName: "myApplications",
            homeURL: "/mr-citizen/home"
          }
        }
      }
    }
  }
};

export default screenConfig;
