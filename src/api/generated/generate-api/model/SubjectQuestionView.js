/**
 * FPT SE OnLearn management API
 * FPT OnLearn Management API
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import StaffQuestionView from './StaffQuestionView';

/**
 * The SubjectQuestionView model module.
 * @module model/SubjectQuestionView
 * @version v1
 */
class SubjectQuestionView {
    /**
     * Constructs a new <code>SubjectQuestionView</code>.
     * @alias module:model/SubjectQuestionView
     */
    constructor() { 
        
        SubjectQuestionView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>SubjectQuestionView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubjectQuestionView} obj Optional instance to populate.
     * @return {module:model/SubjectQuestionView} The populated <code>SubjectQuestionView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SubjectQuestionView();

            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('createDate')) {
                obj['createDate'] = ApiClient.convertToType(data['createDate'], 'Date');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'Boolean');
            }
            if (data.hasOwnProperty('staff')) {
                obj['staff'] = StaffQuestionView.constructFromObject(data['staff']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SubjectQuestionView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SubjectQuestionView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // validate the optional field `staff`
        if (data['staff']) { // data not null
          StaffQuestionView.validateJSON(data['staff']);
        }

        return true;
    }


}



/**
 * @member {String} description
 */
SubjectQuestionView.prototype['description'] = undefined;

/**
 * @member {Date} createDate
 */
SubjectQuestionView.prototype['createDate'] = undefined;

/**
 * @member {Boolean} status
 */
SubjectQuestionView.prototype['status'] = undefined;

/**
 * @member {module:model/StaffQuestionView} staff
 */
SubjectQuestionView.prototype['staff'] = undefined;






export default SubjectQuestionView;

