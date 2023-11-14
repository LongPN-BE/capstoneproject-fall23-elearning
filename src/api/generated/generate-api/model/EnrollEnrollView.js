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
import CourseEnrollView from './CourseEnrollView';
import StudentEnrollView from './StudentEnrollView';
import SyllabusEnrollView from './SyllabusEnrollView';

/**
 * The EnrollEnrollView model module.
 * @module model/EnrollEnrollView
 * @version v1
 */
class EnrollEnrollView {
    /**
     * Constructs a new <code>EnrollEnrollView</code>.
     * @alias module:model/EnrollEnrollView
     */
    constructor() { 
        
        EnrollEnrollView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>EnrollEnrollView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EnrollEnrollView} obj Optional instance to populate.
     * @return {module:model/EnrollEnrollView} The populated <code>EnrollEnrollView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new EnrollEnrollView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('requestDate')) {
                obj['requestDate'] = ApiClient.convertToType(data['requestDate'], 'Date');
            }
            if (data.hasOwnProperty('amount')) {
                obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
            }
            if (data.hasOwnProperty('paymentStatus')) {
                obj['paymentStatus'] = ApiClient.convertToType(data['paymentStatus'], 'String');
            }
            if (data.hasOwnProperty('commission')) {
                obj['commission'] = ApiClient.convertToType(data['commission'], 'Number');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('finishDate')) {
                obj['finishDate'] = ApiClient.convertToType(data['finishDate'], 'Date');
            }
            if (data.hasOwnProperty('student')) {
                obj['student'] = StudentEnrollView.constructFromObject(data['student']);
            }
            if (data.hasOwnProperty('course')) {
                obj['course'] = CourseEnrollView.constructFromObject(data['course']);
            }
            if (data.hasOwnProperty('syllabus')) {
                obj['syllabus'] = SyllabusEnrollView.constructFromObject(data['syllabus']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>EnrollEnrollView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>EnrollEnrollView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['paymentStatus'] && !(typeof data['paymentStatus'] === 'string' || data['paymentStatus'] instanceof String)) {
            throw new Error("Expected the field `paymentStatus` to be a primitive type in the JSON string but got " + data['paymentStatus']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // validate the optional field `student`
        if (data['student']) { // data not null
          StudentEnrollView.validateJSON(data['student']);
        }
        // validate the optional field `course`
        if (data['course']) { // data not null
          CourseEnrollView.validateJSON(data['course']);
        }
        // validate the optional field `syllabus`
        if (data['syllabus']) { // data not null
          SyllabusEnrollView.validateJSON(data['syllabus']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
EnrollEnrollView.prototype['id'] = undefined;

/**
 * @member {Date} requestDate
 */
EnrollEnrollView.prototype['requestDate'] = undefined;

/**
 * @member {Number} amount
 */
EnrollEnrollView.prototype['amount'] = undefined;

/**
 * @member {String} paymentStatus
 */
EnrollEnrollView.prototype['paymentStatus'] = undefined;

/**
 * @member {Number} commission
 */
EnrollEnrollView.prototype['commission'] = undefined;

/**
 * @member {module:model/EnrollEnrollView.StatusEnum} status
 */
EnrollEnrollView.prototype['status'] = undefined;

/**
 * @member {Date} finishDate
 */
EnrollEnrollView.prototype['finishDate'] = undefined;

/**
 * @member {module:model/StudentEnrollView} student
 */
EnrollEnrollView.prototype['student'] = undefined;

/**
 * @member {module:model/CourseEnrollView} course
 */
EnrollEnrollView.prototype['course'] = undefined;

/**
 * @member {module:model/SyllabusEnrollView} syllabus
 */
EnrollEnrollView.prototype['syllabus'] = undefined;





/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
EnrollEnrollView['StatusEnum'] = {

    /**
     * value: "PROCESSING"
     * @const
     */
    "PROCESSING": "PROCESSING",

    /**
     * value: "DONE"
     * @const
     */
    "DONE": "DONE",

    /**
     * value: "PENDING"
     * @const
     */
    "PENDING": "PENDING",

    /**
     * value: "REMOVED"
     * @const
     */
    "REMOVED": "REMOVED"
};



export default EnrollEnrollView;

