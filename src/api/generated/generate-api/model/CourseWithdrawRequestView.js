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
import SubjectWithdrawRequestView from './SubjectWithdrawRequestView';
import TeacherWithdrawRequestView from './TeacherWithdrawRequestView';

/**
 * The CourseWithdrawRequestView model module.
 * @module model/CourseWithdrawRequestView
 * @version v1
 */
class CourseWithdrawRequestView {
    /**
     * Constructs a new <code>CourseWithdrawRequestView</code>.
     * @alias module:model/CourseWithdrawRequestView
     */
    constructor() { 
        
        CourseWithdrawRequestView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>CourseWithdrawRequestView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CourseWithdrawRequestView} obj Optional instance to populate.
     * @return {module:model/CourseWithdrawRequestView} The populated <code>CourseWithdrawRequestView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CourseWithdrawRequestView();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('image')) {
                obj['image'] = ApiClient.convertToType(data['image'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('createDate')) {
                obj['createDate'] = ApiClient.convertToType(data['createDate'], 'Date');
            }
            if (data.hasOwnProperty('price')) {
                obj['price'] = ApiClient.convertToType(data['price'], 'Number');
            }
            if (data.hasOwnProperty('limitTime')) {
                obj['limitTime'] = ApiClient.convertToType(data['limitTime'], 'Number');
            }
            if (data.hasOwnProperty('averagePoint')) {
                obj['averagePoint'] = ApiClient.convertToType(data['averagePoint'], 'Number');
            }
            if (data.hasOwnProperty('teacher')) {
                obj['teacher'] = TeacherWithdrawRequestView.constructFromObject(data['teacher']);
            }
            if (data.hasOwnProperty('subject')) {
                obj['subject'] = SubjectWithdrawRequestView.constructFromObject(data['subject']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>CourseWithdrawRequestView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CourseWithdrawRequestView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // ensure the json data is a string
        if (data['image'] && !(typeof data['image'] === 'string' || data['image'] instanceof String)) {
            throw new Error("Expected the field `image` to be a primitive type in the JSON string but got " + data['image']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // validate the optional field `teacher`
        if (data['teacher']) { // data not null
          TeacherWithdrawRequestView.validateJSON(data['teacher']);
        }
        // validate the optional field `subject`
        if (data['subject']) { // data not null
          SubjectWithdrawRequestView.validateJSON(data['subject']);
        }

        return true;
    }


}



/**
 * @member {String} name
 */
CourseWithdrawRequestView.prototype['name'] = undefined;

/**
 * @member {String} status
 */
CourseWithdrawRequestView.prototype['status'] = undefined;

/**
 * @member {String} image
 */
CourseWithdrawRequestView.prototype['image'] = undefined;

/**
 * @member {String} description
 */
CourseWithdrawRequestView.prototype['description'] = undefined;

/**
 * @member {Date} createDate
 */
CourseWithdrawRequestView.prototype['createDate'] = undefined;

/**
 * @member {Number} price
 */
CourseWithdrawRequestView.prototype['price'] = undefined;

/**
 * @member {Number} limitTime
 */
CourseWithdrawRequestView.prototype['limitTime'] = undefined;

/**
 * @member {Number} averagePoint
 */
CourseWithdrawRequestView.prototype['averagePoint'] = undefined;

/**
 * @member {module:model/TeacherWithdrawRequestView} teacher
 */
CourseWithdrawRequestView.prototype['teacher'] = undefined;

/**
 * @member {module:model/SubjectWithdrawRequestView} subject
 */
CourseWithdrawRequestView.prototype['subject'] = undefined;






export default CourseWithdrawRequestView;

