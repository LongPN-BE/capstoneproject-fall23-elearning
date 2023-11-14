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

/**
 * The StudentEnrollView model module.
 * @module model/StudentEnrollView
 * @version v1
 */
class StudentEnrollView {
    /**
     * Constructs a new <code>StudentEnrollView</code>.
     * @alias module:model/StudentEnrollView
     */
    constructor() { 
        
        StudentEnrollView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>StudentEnrollView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/StudentEnrollView} obj Optional instance to populate.
     * @return {module:model/StudentEnrollView} The populated <code>StudentEnrollView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new StudentEnrollView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>StudentEnrollView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>StudentEnrollView</code>.
     */
    static validateJSON(data) {

        return true;
    }


}



/**
 * @member {Number} id
 */
StudentEnrollView.prototype['id'] = undefined;






export default StudentEnrollView;

