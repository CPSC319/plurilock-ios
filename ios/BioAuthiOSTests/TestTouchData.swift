//
//  TestTouchData.swift
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-04-07.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest
@testable import BioAuthiOS

class TestTouchData: XCTestCase {

  let touchData = TouchData(appName: "BioAuth", timestamp: "10", gestureData: NSDictionary(dictionary:
    ["dx" : 105.1, "dy":258.7, "x0":59.3, "y0":68.1,"vx":4.5, "vy":0.3, "numberActiveTouches":3]), force: 0.5)
  
  override func setUp() {
    super.setUp()

    // Put setup code here. This method is called before the invocation of each test method in the class.
  }
  
  override func tearDown() {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    super.tearDown()
  }
  
  
  func testAppName() {
    XCTAssertEqual(touchData.appName, "BioAuth")
  }
  
  func testTimestamp() {
    XCTAssertEqual(touchData.timestamp, "10")
  }

  func testForce() {
    XCTAssertEqual(touchData.force, 0.5)
  }
  
  func testXPrecision() {
    XCTAssertEqual(touchData.x_precision, 105.1)
  }
  
  func testYPrecision() {
    XCTAssertEqual(touchData.y_precision, 258.7)
  }

  func testXCoord() {
    XCTAssertEqual(touchData.x_coord, 59.3)
  }
  
  func testYCoord() {
    XCTAssertEqual(touchData.y_coord, 68.1)
  }
  
  func testXVelocity() {
    XCTAssertEqual(touchData.velocity_x, 4.5)
  }
  
  func testYVelocity() {
    XCTAssertEqual(touchData.velocity_y, 0.3)
  }
  
  func testMultiTouch() {
    XCTAssertEqual(touchData.eventCode.rawValue, "Multi Touch")
  }
  
  func testSwipeDown() {
    let downTouchData = TouchData(appName: "BioAuth", timestamp: "10", gestureData: NSDictionary(dictionary:
      ["dx" : 105.1, "dy":258.7, "x0":59.3, "y0":68.1,"vx":4.5, "vy":0.3, "numberActiveTouches":1]), force: 0.5)
    XCTAssertEqual(downTouchData.eventCode.rawValue, "Swipe Down")
    
  }
  
  func testSwipeUp() {
    let upTouchData = TouchData(appName: "BioAuth", timestamp: "10", gestureData: NSDictionary(dictionary:
      ["dx" : 105.1, "dy":258.7, "x0":59.3, "y0":68.1,"vx":4.5, "vy":-0.3, "numberActiveTouches":1]), force: 0.5)
    XCTAssertEqual(upTouchData.eventCode.rawValue, "Swipe Up")
    
  }
  
  func testSwipeLeft() {
    let leftTouchData = TouchData(appName: "BioAuth", timestamp: "10", gestureData: NSDictionary(dictionary:
      ["dx" : 105.1, "dy":258.7, "x0":59.3, "y0":68.1,"vx":-4.5, "vy":0, "numberActiveTouches":1]), force: 0.5)
    XCTAssertEqual(leftTouchData.eventCode.rawValue, "Swipe Left")
    
  }
  
  func testSwipeRight() {
    let rightTouchData = TouchData(appName: "BioAuth", timestamp: "10", gestureData: NSDictionary(dictionary:
      ["dx" : 105.1, "dy":258.7, "x0":59.3, "y0":68.1,"vx":4.5, "vy":0, "numberActiveTouches":1]), force: 0.5)
    XCTAssertEqual(rightTouchData.eventCode.rawValue, "Swipe Right")
    
  }
  
  

}
