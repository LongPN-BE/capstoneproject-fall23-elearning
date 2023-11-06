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
import StaffResultQuizView from './StaffResultQuizView';

/**
 * The SubjectResultQuizView model module.
 * @module model/SubjectResultQuizView
 * @version v1
 */
class SubjectResultQuizView {
    /**
     * Constructs a new <code>SubjectResultQuizView</code>.
     * @alias module:model/SubjectResultQuizView
     */
    constructor() { 
        
        SubjectResultQuizView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>SubjectResultQuizView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubjectResultQuizView} obj Optional instance to populate.
     * @return {module:model/SubjectResultQuizView} The populated <code>SubjectResultQuizView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SubjectResultQuizView();

            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('createDate')) {
                obj['createDate'] = ApiClient.convertToType(data['createDate'], 'Date');
            }
            if (data.hasOwnProperty('minPrice')) {
                obj['minPrice'] = ApiClient.convertToType(data['minPrice'], 'Number');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'Boolean');
            }
            if (data.hasOwnProperty('staff')) {
                obj['staff'] = StaffResultQuizView.constructFromObject(data['staff']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SubjectResultQuizView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SubjectResultQuizView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // validate the optional field `staff`
        if (data['staff']) { // data not null
          StaffResultQuizView.validateJSON(data['staff']);
        }

        return true;
    }


}



/**
 * @member {String} description
 */
SubjectResultQuizView.prototype['description'] = undefined;

/**
 * @member {Date} createDate
 */
SubjectResultQuizView.prototype['createDate'] = undefined;

/**
 * @member {Number} minPrice
 */
SubjectResultQuizView.prototype['minPrice'] = undefined;

/**
 * @member {Boolean} status
 */
SubjectResultQuizView.prototype['status'] = undefined;

/**
 * @member {module:model/StaffResultQuizView} staff
 */
SubjectResultQuizView.prototype['staff'] = undefined;






export default SubjectResultQuizView;

