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
 * The TeacherResultQuizView model module.
 * @module model/TeacherResultQuizView
 * @version v1
 */
class TeacherResultQuizView {
    /**
     * Constructs a new <code>TeacherResultQuizView</code>.
     * @alias module:model/TeacherResultQuizView
     */
    constructor() { 
        
        TeacherResultQuizView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>TeacherResultQuizView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TeacherResultQuizView} obj Optional instance to populate.
     * @return {module:model/TeacherResultQuizView} The populated <code>TeacherResultQuizView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TeacherResultQuizView();

            if (data.hasOwnProperty('teacherNumber')) {
                obj['teacherNumber'] = ApiClient.convertToType(data['teacherNumber'], 'String');
            }
            if (data.hasOwnProperty('rating')) {
                obj['rating'] = ApiClient.convertToType(data['rating'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>TeacherResultQuizView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TeacherResultQuizView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['teacherNumber'] && !(typeof data['teacherNumber'] === 'string' || data['teacherNumber'] instanceof String)) {
            throw new Error("Expected the field `teacherNumber` to be a primitive type in the JSON string but got " + data['teacherNumber']);
        }

        return true;
    }


}



/**
 * @member {String} teacherNumber
 */
TeacherResultQuizView.prototype['teacherNumber'] = undefined;

/**
 * @member {Number} rating
 */
TeacherResultQuizView.prototype['rating'] = undefined;






export default TeacherResultQuizView;

