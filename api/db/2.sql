/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : 2

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-04-10 18:34:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for commodity
-- ----------------------------
DROP TABLE IF EXISTS `commodity`;
CREATE TABLE `commodity` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `imgs_id` int(10) DEFAULT NULL COMMENT '商品图片id',
  `name` varchar(100) DEFAULT NULL COMMENT '名称',
  `brief` varchar(100) DEFAULT NULL COMMENT '简述',
  `desc` varchar(255) DEFAULT NULL COMMENT '详细描述',
  `desc_html` varchar(255) DEFAULT NULL COMMENT '详细描述html',
  `original_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '原价',
  `resale_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '转卖价',
  `create_date` int(10) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `edit_date` int(10) DEFAULT NULL COMMENT '最后编辑时间',
  `status` int(2) DEFAULT '0' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commodity
-- ----------------------------
INSERT INTO `commodity` VALUES ('1', null, '1', '2', null, null, '3.00', '4.00', '1554543651', '1554543651', '1');
INSERT INTO `commodity` VALUES ('2', null, '1', '2', null, null, '3.00', '4.00', '1554543666', '1554543666', '1');
INSERT INTO `commodity` VALUES ('3', null, 'iPhone X', 'iPhone X是美国Apple（苹果公司）于北京时间2017年9月13日凌晨1点，在Apple Park新总部的史蒂夫·乔布斯剧院会上发布的新机型。其中“X”是罗马数字“10”的意思，代表着苹果向i', null, null, '8316.00', '6666.66', '1554545175', '1554891349', '0');
INSERT INTO `commodity` VALUES ('4', null, '小米6', '小米6是小米公司在2017年4月19日正式发布的旗舰机，成为国内首款配备高通骁龙835处理器的手机。\n售价：4+64G版售价为2299元，6+64GB版为2499元，128GB版为2899元，陶瓷尊享', null, null, '2499.00', '1999.00', '1554875650', '1554890236', '0');
INSERT INTO `commodity` VALUES ('5', null, '22', '333', null, null, '444.00', '111.00', '1554876551', '1554876551', '1');
INSERT INTO `commodity` VALUES ('6', null, '444', '5555', null, null, '44.00', '22.00', '1554876599', '1554876599', '1');
INSERT INTO `commodity` VALUES ('7', null, '3434', '4545', null, null, '545.00', '65.00', '1554877019', '1554877019', '1');
INSERT INTO `commodity` VALUES ('8', null, '34', '56', null, null, '45.00', '34.00', '1554878278', '1554878278', '1');
INSERT INTO `commodity` VALUES ('9', null, '343', '545', null, null, '33.00', '11.00', '1554878701', '1554878701', '1');
INSERT INTO `commodity` VALUES ('10', null, '434', '545w', null, null, '11.00', '2.00', '1554878716', '1554878716', '1');
INSERT INTO `commodity` VALUES ('11', null, '电风扇', '点点滴滴', null, null, '34.00', '12.00', '1554878744', '1554878744', '1');
INSERT INTO `commodity` VALUES ('12', null, '33', '44', null, null, '44.00', '33.00', '1554886029', '1554886029', '1');
INSERT INTO `commodity` VALUES ('13', null, '111111', '333', null, null, '22.00', '11.00', '1554886267', '1554886267', '1');
INSERT INTO `commodity` VALUES ('14', null, '1', '33', null, null, '44.00', '12.00', '1554886552', '1554886552', '1');
INSERT INTO `commodity` VALUES ('15', null, '小米8', '小米8是小米公司2018年5月31日发布的8周年旗舰手机，亦是小米数字系列的第七代手机。搭载骁龙845处理器，拥有红外人脸识别、双频GPS等技术。具备AI双摄、光学变焦和光学防抖等功能。', null, null, '2499.00', '1999.00', '1554886988', '1554890190', '0');
INSERT INTO `commodity` VALUES ('16', null, '小米9', '小米9，是小米公司旗下一款智能手机，内部代号是战斗天使，采用：高通骁龙855旗舰平台，最高配备12GB内存+256GB存储；搭载索尼三摄全焦段镜头1200万人像镜头， [1-3]  4800万像素主摄', null, null, '3499.00', '2999.00', '1554887157', '1554890396', '0');

-- ----------------------------
-- Table structure for commodity_imgs
-- ----------------------------
DROP TABLE IF EXISTS `commodity_imgs`;
CREATE TABLE `commodity_imgs` (
  `id` int(10) NOT NULL COMMENT 'id',
  `commondity_id` varchar(255) DEFAULT NULL COMMENT '商品id',
  `url` varchar(20) DEFAULT NULL COMMENT '图片地址',
  `order` int(2) DEFAULT NULL COMMENT '排序',
  `create_date` int(10) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commodity_imgs
-- ----------------------------

-- ----------------------------
-- Table structure for kv
-- ----------------------------
DROP TABLE IF EXISTS `kv`;
CREATE TABLE `kv` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `fid` int(10) NOT NULL COMMENT '外键',
  `key` varchar(50) DEFAULT NULL COMMENT '键名',
  `value` varchar(255) DEFAULT NULL COMMENT '值',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of kv
-- ----------------------------
