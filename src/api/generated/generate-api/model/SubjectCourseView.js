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
import StaffCourseView from './StaffCourseView';

/**
 * The SubjectCourseView model module.
 * @module model/SubjectCourseView
 * @version v1
 */
class SubjectCourseView {
    /**
     * Constructs a new <code>SubjectCourseView</code>.
     * @alias module:model/SubjectCourseView
     */
    constructor() { 
        
        SubjectCourseView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>SubjectCourseView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubjectCourseView} obj Optional instance to populate.
     * @return {module:model/SubjectCourseView} The populated <code>SubjectCourseView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SubjectCourseView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
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
                obj['staff'] = StaffCourseView.constructFromObject(data['staff']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SubjectCourseView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SubjectCourseView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // validate the optional field `staff`
        if (data['staff']) { // data not null
          StaffCourseView.validateJSON(data['staff']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
SubjectCourseView.prototype['id'] = undefined;

/**
 * @member {String} name
 */
SubjectCourseView.prototype['name'] = undefined;

/**
 * @member {String} description
 */
SubjectCourseView.prototype['description'] = undefined;

/**
 * @member {Date} createDate
 */
SubjectCourseView.prototype['createDate'] = undefined;

/**
 * @member {Number} minPrice
 */
SubjectCourseView.prototype['minPrice'] = undefined;

/**
 * @member {Boolean} status
 */
SubjectCourseView.prototype['status'] = undefined;

/**
 * @member {module:model/StaffCourseView} staff
 */
SubjectCourseView.prototype['staff'] = undefined;






export default SubjectCourseView;

