// src/utils/convertToToon.ts

import * as THREE from 'three'

/**
 * MeshStandardMaterial から必要なプロパティを引き継いで
 * MeshToonMaterial を生成するサンプル関数
 */
export function convertToToonMaterial(oldMat: THREE.MeshStandardMaterial): THREE.MeshToonMaterial {
  const newMat = new THREE.MeshToonMaterial()

  // ベースカラーをコピー
  newMat.color.copy(oldMat.color)

  // メインテクスチャやノーマルマップ等があればコピー
  if (oldMat.map) newMat.map = oldMat.map
  if (oldMat.normalMap) newMat.normalMap = oldMat.normalMap

  // 透過設定
  newMat.transparent = oldMat.transparent
  newMat.opacity = oldMat.opacity
  newMat.side = oldMat.side
  // newMat.skinning = oldMat.skinning

  // 例: emissive系の値が必要なら適宜コピー
  // newMat.emissive = oldMat.emissive.clone();

  // metalness, roughness は ToonMaterial には存在しないので無視 or 独自実装

  return newMat
}

/**
 * ルートオブジェクト以下を再帰的にトラバースして、
 * 各 Mesh の Material が MeshStandardMaterial だったら
 * MeshToonMaterial に差し替える
 */
export function replaceMaterialsWithToon(root: THREE.Object3D) {
  root.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      // 複数マテリアルの可能性があるため、配列の場合にも対応
      if (Array.isArray(obj.material)) {
        obj.material = obj.material.map((m) => {
          if (m instanceof THREE.MeshStandardMaterial) {
            return convertToToonMaterial(m)
          }
          return m
        })
      } else {
        // 単一マテリアルの場合
        if (obj.material instanceof THREE.MeshStandardMaterial) {
          obj.material = convertToToonMaterial(obj.material)
        }
      }
    }
  })
}
