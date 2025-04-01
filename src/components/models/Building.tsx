// src/components/models/Building.tsx

import React, { useMemo, useRef, useImperativeHandle } from 'react'
import { useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'
import { replaceMaterialsWithToon } from '@/components/utils/convertToToon'

// forwardRefの型指定: ref には THREE.Group が来る想定
export default React.forwardRef<THREE.Group, JSX.IntrinsicElements['group']>(function Building(props, ref) {
  // glTFをロード
  const { scene } = useGLTF('/models/building.glb') as any

  // シーンをクローンし、トゥーン化
  const clonedScene = useMemo(() => {
    if (!scene) return null
    const cloned = SkeletonUtils.clone(scene)
    replaceMaterialsWithToon(cloned)
    return cloned
  }, [scene])

  // コンポーネント内で管理するGroupに紐づけ
  const groupRef = useRef<THREE.Group>(null)

  // 親から渡されるrefに、このgroupRefを紐づける
  useImperativeHandle(ref, () => groupRef.current!, [groupRef])

  // ロードが終わる前にreturnするとnull
  if (!clonedScene) return null

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* トゥーン化済みのクローンを表示 */}
      <primitive object={clonedScene} />
    </group>
  )
})

useGLTF.preload('/models/building.glb')
