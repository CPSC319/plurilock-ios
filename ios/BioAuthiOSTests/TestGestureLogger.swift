//
//  TestGestureLogger.swift
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-04-07.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest
@testable import BioAuthiOS

class TestGestureLogger: XCTestCase {
  
    let gestureLogger = GestureLogger()

    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }

  func testDataArrayOne() {
    gestureLogger.retrieveKeyData("BioAuth", timestamp: "10", keyData: "a", callback: {_ in ()})
    XCTAssertEqual(gestureLogger.dataArray.count, 1)
  }
  
  func testDataArrayMulti() {
    for _ in 1...5 {
      gestureLogger.retrieveKeyData("BioAuth", timestamp: "10", keyData: "a", callback: {_ in ()})
    }
    
    XCTAssertEqual(gestureLogger.dataArray.count, 5)
  }
  
  func testDataArrayMax() {
    for _ in 1...10 {
      gestureLogger.retrieveKeyData("BioAuth", timestamp: "10", keyData: "a", callback: {_ in ()})
    }
    
    XCTAssertEqual(gestureLogger.dataArray.count, 10)
  }
  
  func testDataArrayReset() {
    for _ in 1...11 {
      gestureLogger.retrieveKeyData("BioAuth", timestamp: "10", keyData: "a", callback: {_ in ()})
    }
    print(gestureLogger.dataArray.count)
    XCTAssertEqual(gestureLogger.dataArray.count, 0)
  }
  
  func testDataArrayResetAndOne() {
    for _ in 1...12 {
      gestureLogger.retrieveKeyData("BioAuth", timestamp: "10", keyData: "a", callback: {_ in ()})
    }
    print(gestureLogger.dataArray.count)
    XCTAssertEqual(gestureLogger.dataArray.count, 1)
  }

}
