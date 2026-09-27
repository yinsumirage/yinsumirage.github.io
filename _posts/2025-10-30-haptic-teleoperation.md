---
title: "Haptic Feedback in Teleoperation: Survey Notes"
description: "Survey notes on haptic feedback for teleoperation: how humans perceive touch; vibration, force, electrical stimulation, and fluidic arrays; teleoperation systems such as DOGlove; and UMI-style wearable data collection such as DexUMI and DEXOP."
tags: [robotics, haptics, teleoperation]
---

This survey examines haptic feedback for teleoperation. I carried it out during my internship at Transcengram.

The post first explains why teleoperation needs haptic feedback and how humans perceive touch. It then reviews the ways haptic feedback can be rendered, grouped into vibration, force, electrical stimulation, shape arrays, and others. Next, it looks at several teleoperation systems, as well as UMI-style wearable data collection devices. It closes with a summary and discussion.

## 1. Why Teleoperation Needs Haptic Feedback

The performance of imitation learning depends heavily on data, yet what counts as "good data" is hard to define. Teleoperation is currently the main way to collect data for dexterous hands, and there are three common approaches:

- **Vision-based hand tracking** (e.g., hand tracking on a VR headset): nothing to wear, but prone to occlusion and limited in accuracy;
- **Motion-capture gloves**: accurate, but the operator cannot feel the robot hand's contacts and has to judge by sight whether it is touching something and how hard;
- **Commercial haptic gloves** (e.g., the force-feedback models from SenseGlove and MANUS): good feedback, but expensive and a lot of work to integrate with a robot system.

<figure>
  <img src="/assets/blog/haptic-teleoperation/teleop-methods.jpg" alt="Three kinds of teleoperation: vision-based hand tracking, motion-capture gloves, and commercial haptic gloves">
  <figcaption>Three current kinds of teleoperation. Source: DOGlove project talk</figcaption>
</figure>

Without touch, the operator can only judge contact by sight. When the object is hidden behind the fingers, the contact force is small, or the grip force has to be controlled, this judgment is unreliable. A direct response is to build a low-cost device that combines motion capture with haptic and force feedback.

## 2. Human Tactile Perception

### 2.1 Four Types of Mechanoreceptors

The skin of the hand contains four main types of mechanoreceptors, each responsible for a different kind of tactile information:

| Receptor | Mainly senses | Relevance to manipulation |
| --- | --- | --- |
| Merkel disc | Sustained pressure, edges, and fine shapes | Telling apart surface texture and shape |
| Meissner corpuscle | Light touch, low-frequency vibration, small slips across the skin | Noticing that an object starts to slip |
| Pacinian corpuscle | High-frequency vibration, most sensitive around 250 Hz | Transient vibrations through a held tool, such as impacts and taps |
| Ruffini ending | Skin stretch | Sensing finger posture and the direction of shear forces |

This table serves as a reference for the rest of the post: which receptors a haptic device can stimulate determines what information it can convey. Vibration motors mainly stimulate Pacinian and Meissner corpuscles, so they are good at conveying contact and impacts. Conveying shape requires an array that stimulates Merkel discs, and conveying shear or pulling requires stretching the skin.

### 2.2 Haptic Feedback on Different Body Parts

Haptics is a major research topic in human–computer interaction (HCI). Long before the rise of embodied AI, a large body of HCI work studied how to let people feel virtual or remote environments. By body part, common targets include:

- **Neck**: simulating impacts to the head, and in some work guiding head rotation. Electrical muscle stimulation (EMS) is common here: electrodes placed on the relevant muscles make them contract, producing a sense of pressure or impact.
- **Chest and back**: usually a wearable vest with an array of vibration motors or mechanical pushers. When a collision happens in VR, the actuator at the matching location moves, producing a sense of pressure and impact.
- **Arm**: less studied; a typical approach uses EMS on the arm muscles to simulate the resistance of lifting a heavy object.
- **Fingers**: the most studied, with approaches ranging from vibration and electrotactile feedback to flexible electronic skin and microfluidics (Section 3).
- **Whole body**: for example, transcranial magnetic stimulation of the brain can produce touch sensations across many body parts (Section 3.3).

Teleoperation is mostly concerned with the fingers, but touch on the arm and torso is also useful, for instance to warn the operator that the robot arm is about to hit an obstacle (Section 4.4).

## 3. Ways to Render Haptic Feedback

### 3.1 Vibration: ERM, LRA, and Piezo

Vibration is the cheapest and most widely used form of haptic feedback, found in phones and game controllers. There are three common types of actuators:

- **ERM (eccentric rotating mass)**: a DC motor with an off-center weight that vibrates as it spins. It is simple and very cheap, but amplitude and frequency are both set by the rotation speed and cannot be controlled independently, and it starts and stops slowly, so it can only produce a fairly coarse buzz. In consumer electronics it has largely been replaced by the LRA.
- **LRA (linear resonant actuator)**: a coil, a magnet, and a spring, driven by an AC signal near the resonant frequency so that a mass moves back and forth. It responds quickly, uses little power, and produces a crisp vibration, which makes it the standard choice in current phones. Its drawback is that it is only efficient near the resonant frequency, so its bandwidth is narrow. By vibration direction, LRAs come in a vertical type (Z-axis, usually round) and a lateral type (X/Y-axis, usually rectangular, with a longer stroke and richer vibration).
- **Piezo**: the piezoelectric effect works both ways. Pressing on the material produces a voltage (the direct piezoelectric effect), which can be used for sensing; conversely, applying a voltage deforms the material (the converse piezoelectric effect), so driving it with AC makes it vibrate. Piezo actuators use the latter: piezo films or stacked ceramics deform at high frequency, giving the widest bandwidth and fastest response. They can be programmed to produce different sensations and are well suited to rendering texture and friction, but they need drive voltages of a hundred volts or more, which makes the drive circuitry and packaging more complex. Piezo should not be confused with **piezoresistive** materials, whose resistance merely changes with deformation: they can only be used for sensing, not actuation.

Recommended choices for different applications:

| Goal | Recommended | Reason |
| --- | --- | --- |
| Basic teleoperation cues (contact / impact) | LRA | Fast response, low power, simple structure |
| Complex textures / fine haptics research | Piezo | High frequency, wide bandwidth, programmable sensations |
| Tight budget / DIY | ERM | Very cheap, but only coarse vibration |
| Multi-point, spatial cues | LRA array | Independent feedback per finger; direction can be conveyed through phase differences between motors |

The limits of vibration are also clear: it can only convey whether there is contact and how strong it is, not shape, softness, or the direction of force.

### 3.2 Force Feedback

Force feedback aims to apply real resistance to the operator's fingers, so that they feel the reaction force of grasping an object. Common structures include:

- **Cable-driven**: motors pull the fingers through cables; DOGlove uses this design (Section 4.1). It is light, but can only pull in one direction.
- **Linkage exoskeleton**: linkages transmit motor torque to each finger joint and can measure joint angles at the same time. Many data gloves follow this approach.
- **Brakes / damping**: instead of applying force actively, the device locks a joint or increases damping when needed. For example, ELAXO from Hsin-Ruey Tsai's group uses adjustable resistance to render grasping and twisting, and DextrEMS (Section 3.3) also uses mechanical brakes. Passive designs are safe and power-efficient.

These structures also allow some simple extensions, such as adding pushers on both sides of a finger to introduce a lateral degree of freedom and convey shear force, or using dynamically adjustable damping to render the softness of an object.

Note that when force feedback is produced by motors, how it feels depends heavily on the control scheme. DOGlove found that simply raising the PID gain of the servos makes the feedback feel overly stiff and unnatural.

### 3.3 Electrical and Magnetic Stimulation

Electrical stimulation is very common in HCI research, and Pedro Lopes (now at the University of Chicago) has done a great deal of work in this area.

**Electrical muscle stimulation (EMS)** makes muscles contract involuntarily, producing a sense of being pushed back. For example, stimulating the arm muscles when the user pushes a wall or lifts a heavy box in VR makes the wall feel immovable and the box feel heavy:

<figure class="narrow">
  <img src="/assets/blog/haptic-teleoperation/ems-walls.jpg" alt="Using electrical muscle stimulation to render walls and heavy objects in VR">
  <figcaption>Rendering walls and heavy objects in VR with EMS. Source: Lopes et al., CHI 2017</figcaption>
</figure>

The same method can stimulate the neck muscles to turn the head directly and guide the user's gaze:

<figure>
  <img src="/assets/blog/haptic-teleoperation/ems-neck.jpg" alt="Controlling head orientation with neck muscle stimulation">
  <figcaption>Turning the head with neck EMS. Source: Tanaka et al., CHI 2022</figcaption>
</figure>

**DextrEMS** addresses two inherent problems of EMS: stimulating one finger also moves the others, and holding a finger still requires continuously contracting the opposing muscles, which makes the finger oscillate. It adds mechanical brakes to 8 finger joints (68 g in total): EMS actuates the fingers and the brakes lock them at the target position, enabling more dexterous control.

<figure>
  <img src="/assets/blog/haptic-teleoperation/dextrems.jpg" alt="DextrEMS: electrical muscle stimulation combined with mechanical brakes on the finger joints">
  <figcaption>DextrEMS. Source: Nith et al., UIST 2021</figcaption>
</figure>

**Full-hand electrotactile feedback without obstructing the palm** (CHI 2023 Best Paper): electrodes are placed only on the back of the hand and the wrist. By stimulating the median and ulnar nerves, the device produces touch sensations at 11 locations on the palmar side. Since nothing covers the palm, the user can still grasp real objects normally.

<figure>
  <img src="/assets/blog/haptic-teleoperation/electrotactile-full-hand.jpg" alt="Electrodes on the back of the hand produce touch sensations on the palm and fingers">
  <figcaption>Full-hand electrotactile feedback that leaves the palm free. Source: Tanaka et al., CHI 2023</figcaption>
</figure>

**Magnetic stimulation**: the electrical pulses of EMS cause a tingling sensation, and EMS relies on pre-gelled electrodes that must stay in contact with the skin and dry out quickly. Stimulating muscles with magnetic fields instead (UIST 2023) reduces the tingling and works through clothing.

**Haptic Source-Effector** (CHI 2024) goes further: it applies transcranial magnetic stimulation (TMS) to the brain. Moving a single magnetic coil to different locations on the scalp produces 15 different touch and force sensations across the body, without placing an actuator on each body part.

<figure>
  <img src="/assets/blog/haptic-teleoperation/haptic-source-effector.jpg" alt="Producing touch sensations on several body parts by stimulating the brain">
  <figcaption>Haptic Source-Effector. Source: Tanaka et al., CHI 2024</figcaption>
</figure>

The advantage of electrical (and magnetic) stimulation is that the devices can be very small and light while still producing real forces. Its limitations are equally clear: responses vary greatly between individuals, so calibration is needed before every use, and the tingling and safety risks make long sessions difficult. Overall, electrical stimulation remains mainly a research technique and is still far from a product suitable for long-term use.

### 3.4 Shape Arrays

Rendering shape requires a "pixel array" on the fingertip whose pixels can rise independently. The most direct approach is an array of mechanical pins, but it is hard to miniaturize; large tabletop pin arrays have also been built.

**Fluid Reality** (CMU, UIST 2023) is the closest to an ideal solution among the work covered here. Each fingertip carries an array of bubble-like pixels filled with liquid; when a pixel is energized, liquid flows into the bubble and inflates it. Each pixel is an electroosmotic pump only a few hundred micrometers thick, with no moving parts, which moves the liquid by acting directly on the charges in it with an electric field.

<figure>
  <img src="/assets/blog/haptic-teleoperation/fluid-reality.jpg" alt="Fluid Reality: pushing a box with a finger in VR raises the fingertip array and lights up every contact point">
  <figcaption>Pushing a box in VR: the real fingertip array (top right) and the activated contact points (bottom right). Source: Shen et al., UIST 2023 (frame from the project video)</figcaption>
</figure>

This design meets the requirements above well:

1. **It is an array**: it can convey the rough shape of an object and responds quickly;
2. **It is cheap and portable**: the glove is untethered and weighs only 207 g including all drive electronics and the battery, reportedly runs for about 3 hours, and costs under $1,000 to build.

The difficulty is fabrication: the packaging leaks easily, and improving on the design requires some background in chemistry (according to a fellow student who tried to reproduce it). The project has since been spun out into a company, so if the goal is a product, buying it may be more practical than reproducing it.

**Flexible electronic skin** and **micro-vibration arrays** can also render fine patterns and textures. They are safer than electrical stimulation and feel more realistic, but are similarly complex to fabricate.

### 3.5 Softness, Friction, and Other Sensations

Other work does not apply force directly, but instead changes how the finger perceives real objects:

- **Altering perceived softness** (Lopes's group, UIST 2021 Best Paper): restricting the deformation of the fingerpad makes a rigid object feel softer. The device only clamps the sides of the fingerpad, leaving most of it exposed, so the user can still feel the object's texture, and the object itself needs no modification.
- **Stick&Slip** (Lopes's group, CHI 2024): depositing a quickly evaporating liquid on the fingerpad changes the friction between the fingerpad and a surface, making the surface feel slippery or sticky (by about ±60%); friction returns to normal once the liquid evaporates. It does not require modifying the touched surface, but it only works when the finger touches a real surface, so it is hard to apply directly to teleoperation.

<figure>
  <img src="/assets/blog/haptic-teleoperation/stick-slip.jpg" alt="Stick&amp;Slip: a liquid coating makes the same surface feel slippery or sticky">
  <figcaption>Stick&amp;Slip. Source: Mazursky et al., CHI 2024</figcaption>
</figure>

- **HairTouch** (CHI 2021): a bundle of brush hairs extends from a VR controller; changing how far the hairs extend and how tightly they are constrained renders differences in stiffness, roughness, and surface height.
- **GuideBand** (CHI 2021): three motors pull a wristband through strings, applying forces of different strengths in three dimensions to guide the forearm.
- **FingerX** (CHI 2022): extendable and withdrawable supports on the fingers work together with real objects to render the shapes of virtual objects.

Hsin-Ruey Tsai was involved in all three, and ELAXO, mentioned above, also comes from his lab.

Temperature and humidity are also part of touch, but they are hard to use in teleoperation: heat and liquid transfer too slowly to keep up with rapid changes in contact. Texture also has few applications, since in most manipulation tasks it has little effect on the motion.

### 3.6 Summary

| Method | What it can convey | Pros | Cons |
| --- | --- | --- | --- |
| Vibration (ERM / LRA / piezo) | Contact, impacts, rough force level; piezo can also render texture | Cheap, light, easy to integrate | Cannot convey shape or force direction |
| Force feedback (cables / linkages / brakes) | Grasp resistance, object softness | Real forces | Heavy; usually one direction only |
| Electrical / magnetic stimulation (EMS / electrotactile / TMS) | Force, touch at multiple locations | Small and light | Large individual differences, needs calibration, tingling and safety risks |
| Shape arrays (pins / fluidics) | Shape, contact location | Rich information | Complex fabrication, hard to mass-produce |
| Altering softness / friction | Softness, slipperiness | Works together with real objects | Depends on real objects; limited use cases |

## 4. Haptic Feedback in Teleoperation

### 4.1 DOGlove: A Low-Cost Haptic Force-Feedback Glove

The goal of DOGlove (RSS 2025) is summed up in one line from its authors: "Bring everything about touch back to human." It targets real-time teleoperation rather than offline demonstration, aiming for a low-cost device that combines motion capture with haptic and force feedback.

<figure>
  <img src="/assets/blog/haptic-teleoperation/doglove-overview.jpg" alt="The DOGlove glove and a dexterous hand in simulation">
  <figcaption>DOGlove. Source: Zhang et al., RSS 2025</figcaption>
</figure>

**Hardware**: 21-DoF motion capture plus 5-DoF force feedback, for a total cost under $600, and fully open source. Each finger is pulled by a motor through a cable to provide force feedback, and each fingertip has an LRA for vibration feedback.

<figure>
  <img src="/assets/blog/haptic-teleoperation/doglove-finger.jpg" alt="DOGlove's cable-driven pulley system and exploded view of a finger">
  <figcaption>The cable-driven mechanism and an exploded view of one finger. Source: Zhang et al., RSS 2025</figcaption>
</figure>

**Action retargeting**: the human hand and the robot hand differ in size and joint structure, so the joint angles measured by the glove have to be mapped onto the robot hand. DOGlove first computes the human fingertip positions with the glove's forward kinematics, scales and transforms them, and then solves for the robot hand's joint angles with its inverse kinematics. A key requirement is preserving finger opposition: when the human thumb and index finger touch, the robot's thumb and index finger must touch as well. This mapping has to be designed by hand and takes considerable effort.

<figure>
  <img src="/assets/blog/haptic-teleoperation/doglove-retargeting.jpg" alt="Mapping from the human hand through the glove's forward kinematics and fingertip inverse kinematics to the robot hand">
  <figcaption>Action retargeting. Source: Zhang et al., RSS 2025</figcaption>
</figure>

**Haptic and force retargeting**: the robot fingertips carry 1-D force sensors, and DOGlove switches between vibration and force feedback based on the measured force:

| Fingertip force | Vibration | Force feedback | Notes |
| --- | :---: | :---: | --- |
| < 10 g | ✗ | ✗ | Threshold separates real contact from sensor noise |
| 10–50 g | ✓ | ✗ | Light contact uses vibration only |
| 50–100 g | ✓ | ✓ | Force feedback is added |
| > 100 g | ✗ | ✓ | Force feedback only |

<figure>
  <img src="/assets/blog/haptic-teleoperation/doglove-haptic-force.jpg" alt="DOGlove's three thresholds for switching between vibration and force feedback by fingertip force">
  <figcaption>The three thresholds of haptic and force retargeting. Source: Zhang et al., RSS 2025</figcaption>
</figure>

Force feedback is not used for light contact for two reasons. First, people are sensitive to vibration, so vibration conveys light contact more naturally. Second, force feedback is produced by adjusting the servo torque (specifically, the PID gain Kp), which tends to feel overly stiff at small forces.

**Future directions**: the authors argue that a binary or 1-D signal is not enough. Beyond whether contact happens, information such as material, softness, and temperature also matters, and they are experimenting with a shape-sensing array.

### 4.2 Bunny-VisionPro: Low-Cost Feedback with ERMs

Bunny-VisionPro (IROS 2025) uses the Apple Vision Pro for bimanual dexterous teleoperation and implements low-cost haptic feedback with ERMs:

- FSR pressure sensors on the robot's five fingertips read the contact pressure between the fingers and the object in real time;
- the readings are zero-calibrated (baselines are collected at multiple joint positions, interpolated, and subtracted) and then low-pass filtered;
- the tactile intensity is normalized to a 0–255 PWM duty cycle that directly drives ERM vibration motors on the operator's fingers.

<figure>
  <img src="/assets/blog/haptic-teleoperation/bunny-haptics.jpg" alt="Bunny-VisionPro's FSR sensors, ERM vibration motors, and zero-drift calibration curves">
  <figcaption>Left: FSRs on the robot fingertips and ERMs on the operator's hand. Right: the tactile signal before and after zero-drift calibration. Source: Ding et al., IROS 2025</figcaption>
</figure>

The paper also adds touch to the policy input in two ways: as a vector appended to the robot state and encoded with an MLP, and as points, where fingertips in contact are added to the camera point cloud for visual encoding. The results:

- in simple single-arm tasks, tactile input brings almost no improvement;
- in bimanual tasks (such as bimanual pinching and cooperative carrying), it brings a small improvement;
- a user study shows that operators subjectively prefer having vibration feedback, finding it more natural and making contact easier to perceive.

This suggests that haptic feedback may help the person collecting the data more directly than it helps the policy as an input. In addition, ERMs are rather dated, and switching to LRAs would give better feedback.

### 4.3 Visualizing Touch in AR

Besides delivering touch to the hand, another approach is to visualize tactile information:

- The teleoperation system TactAR in **RDP (Reactive Diffusion Policy, RSS 2025)** renders tactile and force-induced deformation on the end effector in AR in real time, helping the operator with tasks that require controlling contact force, such as peeling a cucumber or wiping writing off a vase;
- A dexterous-hand work from KTH (*Learning Dexterous In-Hand Manipulation with Multifingered Hands via Visuomotor Diffusion*, IROS 2025) tracks the human hand with Meta Quest 3 passthrough AR and overlays the tracking result, so the operator can see the hand pose in real time; it provides no haptic feedback.

Building on this, the direction of force and the contact locations could also be overlaid in AR. RDP uses a gripper; extending it to a dexterous hand and overlaying the tactile visualization directly on the operator's own hand may work even better.

### 4.4 Whole-Body Vibrotactile Cues

AeroHaptix is a wearable vibrotactile system: when the operator flies a drone remotely, obstacles that are not visible on screen are signaled by vibrations at the corresponding location on the body, reducing collisions.

<figure class="medium">
  <img src="/assets/blog/haptic-teleoperation/aerohaptix.jpg" alt="AeroHaptix: vibrations on the body signal obstacles that are not visible while flying a drone">
  <figcaption>AeroHaptix. Source: Huang et al., RA-L 2025</figcaption>
</figure>

The same idea applies to robot teleoperation: a few vibration motors on the operator's arm or torso could warn that the robot arm is about to hit something nearby. Arm exoskeletons (such as AirExo) already exist, but using touch to signal collisions is still worth exploring.

## 5. UMI-Style Wearable Data Collection

UMI records human manipulation directly with a handheld gripper, with no robot needed during collection. The following works extend this idea to dexterous hands: the collection device is worn on the hand and people perform the task with their own hands, so they naturally have full tactile feedback and there is no need to render touch back to the operator.

### 5.1 Feel the Force: The Same Tactile Sensor on Hand and Gripper

FTF (Feel the Force, RSS 2025 workshop) does not use teleoperation but collects human demonstrations directly. The operator wears a glove with an AnySkin-style magnetic tactile sensor on the thumb pad, and one fingertip of the robot gripper carries the same sensor. The idea is that if human forces are to be transferred to the robot, both ends should use the same sensor. For simplicity, the mapping from the human hand to the gripper is fixed.

<figure>
  <img src="/assets/blog/haptic-teleoperation/ftf-glove.jpg" alt="Feel the Force: AnySkin tactile sensors on both the human glove and the robot gripper">
  <figcaption>Left: the AnySkin glove worn by the data collector. Right: the gripper fitted with AnySkin. Source: Adeniji et al., 2025</figcaption>
</figure>

The policy learns from the history of robot and object keypoint trajectories, forces, and gripper states, predicts future motion and the required contact force, and passes them to the gripper's force feedback controller for execution.

<figure>
  <img src="/assets/blog/haptic-teleoperation/ftf-overview.jpg" alt="The Feel the Force pipeline: human demonstration, a force-sensitive policy, and robot execution">
  <figcaption>The Feel the Force pipeline. Source: Adeniji et al., 2025</figcaption>
</figure>

### 5.2 DexUMI: An Exoskeleton Matching the Robot Hand's Kinematics

DexUMI (CoRL 2025, Best Paper finalist) aims to close two gaps between the human hand and a dexterous robot hand:

- **Hardware gap**: an exoskeleton is designed for a specific robot hand (such as the Inspire Hand or XHand), with joints and link lengths matching the robot hand. When a person operates while wearing it, the motion maps over directly, without retargeting.
- **Visual gap**: segmentation and image inpainting models remove the human hand and exoskeleton from the video and replace them with images of the robot hand, so the training data looks visually like the robot doing the task itself.

<figure>
  <img src="/assets/blog/haptic-teleoperation/dexumi-hardware.jpg" alt="DexUMI's exoskeletons for the Inspire Hand and XHand, recording actions and observations">
  <figcaption>DexUMI's exoskeletons. Source: Xu et al., CoRL 2025</figcaption>
</figure>

Compared with UMI, DexUMI is less novel, but it runs the full pipeline from data collection to policy deployment and collects data much more efficiently: in 15 minutes, teleoperation yields 11 trajectories, DexUMI 36, and the bare human hand 51.

<figure class="medium">
  <img src="/assets/blog/haptic-teleoperation/dexumi-efficiency.jpg" alt="Number of trajectories collected in 15 minutes with teleoperation, DexUMI, and the bare hand">
  <figcaption>Collection efficiency. Source: Xu et al., CoRL 2025</figcaption>
</figure>

### 5.3 DEXOP: A Hand Exoskeleton with a Passive Robot Hand

DEXOP proposes a collection paradigm called perioperation: the person wears a hand exoskeleton connected to a passive robot hand, and the human fingers drive the robot fingers directly through linkages, allowing 1:1 operation.

- Collection is fast, the operator feels contacts directly, and precision is ensured;
- the robot hand is covered with tactile sensors; although touch cannot fully capture shape, the operator can rely on sight, which ensures that the collected data completes the task;
- only a wrist camera and touch are used, with no third-person view, so no human hand appears in the images and there is no visual gap;
- the arm is mounted on the AirExo-2 whole-arm exoskeleton, so arm motion is collected at the same time.

<figure>
  <img src="/assets/blog/haptic-teleoperation/dexop.jpg" alt="DEXOP: an exoskeleton and robot hand with whole-hand tactile sensors">
  <figcaption>DEXOP. Source: Fang et al., 2025</figcaption>
</figure>

Its limitations: the width of the linkages makes finger opposition difficult and causes some collisions. In addition, DEXOP is built around the authors' own robot hand, designed from the start to be mounted and removed; a sealed commercial dexterous hand would be hard to modify in the same way.

### 5.4 Other Related Work

- **DigituSync** (UIST 2022): a passive exoskeleton that links two people's hands, transmitting finger motion in real time with an adjustable force ratio between the two. The idea is close to DEXOP, but it only transmits finger flexion and cannot perform grasps.
- **Festo ExoHand** (2012): an early pneumatic exoskeleton hand that transmits human hand motion to a robot hand in real time and feeds the robot hand's grasp force back to the operator, making it bidirectional.
- **Embroidered smart gloves** (Nature Communications 2024): a digital embroidery machine stitches piezoresistive tactile sensors and vibration actuators directly into fabric, quickly producing gloves that both sense and give feedback; the demonstrations include robot teleoperation.
- **Open-source tactile sensors**: for example, 3D-ViTac open-sourced a low-cost flexible tactile sensor that the authors say can be made in 30 minutes. Human-hand collection setups such as DexUMI currently cannot record touch; attaching such sensors to the hand would capture tactile data as well.
- **Co-Embodiment**: an experiment shown at a conference, later written up as the paper *One Body, Two Minds* (KTH, 2026). A diffusion policy handles grasping, and the user only needs to nod to trigger task-relevant finger actions, such as pressing a drill's trigger. Users adapt to this control scheme quickly. This suggests that a low-DoF hand could perhaps be controlled with four buttons and a joystick, though less efficiently than with DEXOP.

## 6. Summary and Discussion

1. **Electrical stimulation is the most common in research but hard to turn into a product.** Individual differences are large, calibration is required before use, and there are safety risks, so it remains mainly a research technique.
2. **Flexible skin, liquid pumps, and micro-vibration arrays are safer and feel more realistic, but are complex to fabricate.**
3. **High-fidelity touch is hard to achieve with any single technique** and calls for interdisciplinary work. For embodied AI, the more sensible direction is to focus on embodied data rather than on haptics for its own sake: prioritize convenient, high-quality data collection over a high-fidelity collection experience.
4. **When the scene is visible and control is easy, simple vibration feedback is largely sufficient.** DOGlove essentially reaches the ceiling of simple haptic feedback; further gains mostly come from combining actuators such as ERMs and LRAs.
5. **Sensor placement should be driven by collection needs, not by the designer's assumptions.** Whether to add sensing at the middle phalanges or control at the fingertips, for example, should depend on what is actually needed during collection.

In summary, touch plays three main roles in embodied data collection:

| Role | Representative work | Possible directions |
| --- | --- | --- |
| The operator feels touch during teleoperation | DOGlove, Bunny-VisionPro | Vibration, force, direct linkages, or new materials and fluidic arrays |
| The operator sees touch during teleoperation | RDP, AR visualization | AR combined with vibration, showing force direction and contact locations on screen |
| UMI-style wearable collection | FTF, DexUMI, DEXOP | Hand-worn devices with 1:1 control, combined with low-cost tactile sensors |

In my view, the third approach is the most scalable: the device is worn on the hand, collection is fast, and the operation matches human proprioception, making it the form of data collection closest to the human.

Finally, before collecting data, it may be worth first defining what good teleoperation data actually is: which of trajectories, velocities, and forces the policy really needs.

## References

### Teleoperation and Data Collection

1. H. Zhang, S. Hu, Z. Yuan, H. Xu. [DOGlove: Dexterous Manipulation with a Low-Cost Open-Source Haptic Force Feedback Glove](https://arxiv.org/abs/2502.07730). *RSS*, 2025.
2. R. Ding, Y. Qin, J. Zhu, C. Jia, et al. [Bunny-VisionPro: Real-Time Bimanual Dexterous Teleoperation for Imitation Learning](https://arxiv.org/abs/2407.03162). *IROS*, 2025.
3. A. Adeniji, Z. Chen, V. Liu, V. Pattabiraman, et al. [Feel the Force: Contact-Driven Learning from Humans](https://arxiv.org/abs/2506.01944). *arXiv*, 2025.
4. R. Bhirangi, V. Pattabiraman, E. Erciyes, Y. Cao, et al. [AnySkin: Plug-and-play Skin Sensing for Robotic Touch](https://arxiv.org/abs/2409.08276). *ICRA*, 2025.
5. C. Chi, Z. Xu, C. Pan, E. Cousineau, et al. [Universal Manipulation Interface: In-The-Wild Robot Teaching Without In-The-Wild Robots](https://arxiv.org/abs/2402.10329). *RSS*, 2024.
6. M. Xu, H. Zhang, Y. Hou, Z. Xu, et al. [DexUMI: Using Human Hand as the Universal Manipulation Interface for Dexterous Manipulation](https://arxiv.org/abs/2505.21864). *CoRL*, 2025.
7. H.-S. Fang, B. Romero, Y. Xie, A. Hu, et al. [DEXOP: A Device for Robotic Transfer of Dexterous Human Manipulation](https://arxiv.org/abs/2509.04441). *arXiv*, 2025.
8. H. Fang, H.-S. Fang, Y. Wang, J. Ren, et al. [AirExo: Low-Cost Exoskeletons for Learning Whole-Arm Manipulation in the Wild](https://arxiv.org/abs/2309.14975). *ICRA*, 2024.
9. H. Fang, C. Wang, Y. Wang, J. Chen, et al. [AirExo-2: Scaling up Generalizable Robotic Imitation Learning with Low-Cost Exoskeletons](https://arxiv.org/abs/2503.03081). *CoRL*, 2025.
10. H. Xue, J. Ren, W. Chen, G. Zhang, et al. [Reactive Diffusion Policy: Slow-Fast Visual-Tactile Policy Learning for Contact-Rich Manipulation](https://arxiv.org/abs/2503.02881). *RSS*, 2025.
11. P. Koczy, M. C. Welle, D. Kragic. [Learning Dexterous In-Hand Manipulation with Multifingered Hands via Visuomotor Diffusion](https://arxiv.org/abs/2503.02587). *IROS*, 2025.
12. P. Koczy, Y. Zhang, D. Kragic, M. C. Welle. [One Body, Two Minds: Variable Autonomy Approach for a Co-embodied Robotic Hand](https://arxiv.org/abs/2606.25575). *arXiv*, 2026.
13. B. Huang, Y. Wang, X. Yang, Y. Luo, Y. Li. [3D-ViTac: Learning Fine-Grained Manipulation with Visuo-Tactile Sensing](https://arxiv.org/abs/2410.24091). *CoRL*, 2024.
14. Y. Luo, C. Liu, Y. J. Lee, J. DelPreto, et al. [Adaptive tactile interaction transfer via digitally embroidered smart gloves](https://doi.org/10.1038/s41467-024-45059-8). *Nature Communications*, 2024.
15. B. Huang, Z. Wang, Q. Cheng, S. Ren, et al. [AeroHaptix: A Wearable Vibrotactile Feedback System for Enhancing Collision Avoidance in UAV Teleoperation](https://arxiv.org/abs/2407.12105). *IEEE RA-L*, 2025.
16. Festo. [ExoHand](https://www.festo.com/us/en/e/about-festo/research-and-development/bionic-learning-network/highlights-from-2010-to-2012/exohand-id_33631/). Bionic Learning Network, 2012.

### Haptic Feedback (HCI)

1. P. Lopes, S. You, L.-P. Cheng, S. Marwecki, P. Baudisch. [Providing Haptics to Walls & Heavy Objects in Virtual Reality by Means of Electrical Muscle Stimulation](https://doi.org/10.1145/3025453.3025600). *CHI*, 2017.
2. Y. Tanaka, J. Nishida, P. Lopes. [Electrical Head Actuation: Enabling Interactive Systems to Directly Manipulate Head Orientation](https://doi.org/10.1145/3491102.3501910). *CHI*, 2022.
3. R. Nith, S.-Y. Teng, P. Li, Y. Tao, P. Lopes. [DextrEMS: Increasing Dexterity in Electrical Muscle Stimulation by Combining it with Brakes](https://doi.org/10.1145/3472749.3474759). *UIST*, 2021.
4. Y. Tanaka, A. Shen, A. Kong, P. Lopes. [Full-hand Electro-Tactile Feedback without Obstructing Palmar Side of Hand](https://doi.org/10.1145/3544548.3581382). *CHI*, 2023.
5. Y. Tanaka, A. Takahashi, P. Lopes. [Interactive Benefits from Switching Electrical to Magnetic Muscle Stimulation](https://doi.org/10.1145/3586183.3606812). *UIST*, 2023.
6. Y. Tanaka, J. Serfaty, P. Lopes. [Haptic Source-effector: Full-body Haptics via Non-invasive Brain Stimulation](https://doi.org/10.1145/3613904.3642483). *CHI*, 2024.
7. Y. Tao, S.-Y. Teng, P. Lopes. [Altering Perceived Softness of Real Rigid Objects by Restricting Fingerpad Deformation](https://doi.org/10.1145/3472749.3474800). *UIST*, 2021.
8. A. Mazursky, J. Serfaty, P. Lopes. [Stick&Slip: Altering Fingerpad Friction via Liquid Coatings](https://doi.org/10.1145/3613904.3642299). *CHI*, 2024.
9. J. Nishida, Y. Tanaka, R. Nith, P. Lopes. [DigituSync: A Dual-User Passive Exoskeleton Glove That Adaptively Shares Hand Gestures](https://doi.org/10.1145/3526113.3545630). *UIST*, 2022.
10. V. Shen, T. Rae-Grant, J. Mullenbach, C. Harrison, C. Shultz. [Fluid Reality: High-Resolution, Untethered Haptic Gloves using Electroosmotic Pump Arrays](https://doi.org/10.1145/3586183.3606771). *UIST*, 2023.
11. Z.-Y. Zhang, H.-X. Chen, S.-H. Wang, H.-R. Tsai. [ELAXO: Rendering Versatile Resistive Force Feedback for Fingers Grasping and Twisting](https://doi.org/10.1145/3526113.3545677). *UIST*, 2022.
12. H.-R. Tsai, C. Tsai, Y.-S. Liao, Y.-T. Chiang, Z.-Y. Zhang. [FingerX: Rendering Haptic Shapes of Virtual Objects Augmented by Real Objects using Extendable and Withdrawable Supports on Fingers](https://doi.org/10.1145/3491102.3517489). *CHI*, 2022.
13. H.-R. Tsai, Y.-C. Chang, T.-Y. Wei, C.-A. Tsao, et al. [GuideBand: Intuitive 3D Multilevel Force Guidance on a Wristband in Virtual Reality](https://doi.org/10.1145/3411764.3445262). *CHI*, 2021.
14. C.-J. Lee, H.-R. Tsai, B.-Y. Chen. [HairTouch: Providing Stiffness, Roughness and Surface Height Differences Using Reconfigurable Brush Hairs on a VR Controller](https://doi.org/10.1145/3411764.3445285). *CHI*, 2021.
