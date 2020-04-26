import {
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getPattern,
  getSelectField,
  getTextField,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from 'lodash/get';

export const propertyAssemblyDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Property Assembly Details",
      labelKey: "PT_COMMON_PROPERTY_ASSEMBLY_DETAILS"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  propertyAssemblyDetailsContainer: getCommonContainer({
    propertyType: getSelectField({
      label: {
        labelName: "Property Type",
        labelKey: "PT_COMMON_PROPERTY_TYPE"
      },
      placeholder: {
        labelName: "Select Property Type",
        labelKey: "PT_COMMON_PROPERTY_TYPE_PLACEHOLDER"
      },
      required: true,
      jsonPath:
        "registerScreen.propertyType",
      // localePrefix: {
      //   moduleName: "PropertyTax",
      //   masterName: "PropertyType"
      // },
      sourceJsonPath: "searchScreenMdmsData.PropertyTax.PropertyType",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),
    totalLandArea: getTextField({
      label: {
        labelName: "Total Land Area",
        labelKey: "PT_COMMON_TOTAL_LAND_AREA"
      },
      props: {
      },
      placeholder: {
        labelName: "Select Total Land Area",
        labelKey: "PT_COMMON_TOTAL_LAND_AREA_PLACEHOLDER"
      },
      required: true,
      pattern: /^[0-9]\d{0,9}(\.\d{1,3})?%?$/,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "registerScreen.totalLandArea"
    }),
    totalConstructedArea: getTextField({
      label: {
        labelName: "Total Constructed Area",
        labelKey: "PT_COMMON_TOTAL_CONSTRUCTED_AREA"
      },
      props: {
      },
      placeholder: {
        labelName: "Enter Total Constructed Area",
        labelKey: "PT_COMMON_TOTAL_CONSTRUCTED_AREA_PLACEHOLDER"
      },
      required: true,
      pattern: /^[0-9]\d{0,9}(\.\d{1,3})?%?$/,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "registerScreen.totalConstructedArea"
    }),
    usageType: getSelectField({
      label: {
        labelName: "Usage Type",
        labelKey: "PT_COMMON_USAGE_TYPE"
      },
      placeholder: {
        labelName: "Select Usage Type",
        labelKey: "PT_COMMON_USAGE_TYPE_PLACEHOLDER"
      },
      required: true,
      jsonPath:
        "registerScreen.usageType",
      // localePrefix: {
      //   moduleName: "PropertyTax",
      //   masterName: "UsageCategory"
      // },
      sourceJsonPath: "searchScreenMdmsData.PropertyTax.UsageType",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      },
      beforeFieldChange: async (action, state, dispatch) => {
        let subTypeValues=get(
          state.screenConfiguration.preparedFinalObject,
            "searchScreenMdmsData.PropertyTax.subUsageType"
        )
        dispatch(
          prepareFinalObject(
            "propsubusagetypeForSelectedusageCategory",
            subTypeValues.filter(cur=>{
              return (cur.code.startsWith(action.value))
            })
          )
        )
      }
    }),
    subUsageType: getSelectField({
      label: {
        labelName: "Sub Usage Type",
        labelKey: "PT_COMMON_SUB_USAGE_TYPE"
      },
      placeholder: {
        labelName: "Select Sub Usage Type",
        labelKey: "PT_COMMON_SUB_USAGE_TYPE_PLACEHOLDER"
      },
      required: true,
      jsonPath:
        "registerScreen.subUsageType",
      // localePrefix: {
      //   moduleName: "PropertyTax",
      //   masterName: "ReasonForTransfer"
      // },
      sourceJsonPath: "propsubusagetypeForSelectedusageCategory",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    })
  })
}); 
