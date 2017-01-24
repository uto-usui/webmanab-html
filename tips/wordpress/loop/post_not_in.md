# 現在の記事を省いて同じ投稿タイプの記事を表示する



#### php

```

<?php
  // related post
  // - - - - - - - - - -
  $post_type =  get_post_type_object( get_post_type() )->label;
  $exclude_id = array(get_the_ID());
  $args = array(
    'post_type'       => $post_type,
    'posts_per_page'  => '3',
    'post__not_in'    => $exclude_id
  );
  $my_query = new WP_Query( $args );
  if($my_query->have_posts()) {
?>
<ul>
  <?php
    while ($my_query->have_posts()) {
    $my_query->the_post();
  ?>
  <li><a href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a></li>
  <?php } ?>
</ul>
<?php
  }
  wp_reset_postdata();
?>

```









おわります。
